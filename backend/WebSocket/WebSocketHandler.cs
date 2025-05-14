using System;
using System.Collections.Concurrent; // For ConcurrentDictionary
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Gym_project.Data;       // Assuming this is your DbContext namespace
using Gym_project.Models;     // Assuming this is your Message model namespace
using Gym_project.DTO;        // Assuming this is your MessageDto namespace
using Microsoft.Extensions.Logging; // For ILogger (optional but good practice)

public class WebSocketHandler
{
    private readonly GymDbContext _context;
    private readonly ConcurrentDictionary<int, WebSocket> _connectedClients = new();
    private readonly ILogger<WebSocketHandler> _logger; // Optional: For more structured logging

    // Constructor expects GymDbContext and optionally ILogger via DI
    public WebSocketHandler(GymDbContext context, ILogger<WebSocketHandler> logger) // Added ILogger
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger)); // Added ILogger
    }

    // If you don't want to inject ILogger yet, you can use the simpler constructor:
    // public WebSocketHandler(GymDbContext context)
    // {
    //     _context = context ?? throw new ArgumentNullException(nameof(context));
    //     _logger = null; // Or handle logging differently, e.g., Console.WriteLine
    // }

    public async Task HandleWebSocketConnectionAsync(HttpContext httpContext, WebSocket webSocket)
    {
        _logger.LogInformation("WebSocket connection attempt initiated by {RemoteIpAddress}", httpContext.Connection.RemoteIpAddress);

        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);

        if (!httpContext.User.Identity.IsAuthenticated || userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            _logger.LogWarning("WebSocket authentication failed. UserAuthenticated: {IsAuthenticated}, UserIdClaim: {UserIdClaimValue}. Closing connection.",
                httpContext.User.Identity.IsAuthenticated,
                userIdClaim?.Value ?? "null");

            await webSocket.CloseAsync(WebSocketCloseStatus.PolicyViolation, "Authentication required or invalid user ID.", CancellationToken.None);
            return;
        }

        _logger.LogInformation("WebSocket connection authenticated for User ID: {UserId}", userId);

        // Handle if user is already connected (e.g., close old socket or prevent new one)
        // For now, we'll overwrite, which means the newest connection for a user is the active one.
        if (_connectedClients.TryGetValue(userId, out var existingSocket))
        {
            _logger.LogInformation("User ID {UserId} already connected. Closing previous socket.", userId);
            // Optionally, you might want to close the existingSocket gracefully here
            // await existingSocket.CloseAsync(WebSocketCloseStatus.PolicyViolation, "New connection established", CancellationToken.None);
            // _connectedClients.TryRemove(userId, out _); // Ensure removal if close doesn't trigger it immediately
        }

        _connectedClients[userId] = webSocket;
        _logger.LogInformation("WebSocket connection stored for User ID: {UserId}. Total clients: {ClientCount}", userId, _connectedClients.Count);


        var buffer = new byte[1024 * 4]; // 4KB buffer
        WebSocketReceiveResult result;

        try
        {
            while (webSocket.State == WebSocketState.Open)
            {
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    _logger.LogInformation("WebSocket close message received from User ID: {UserId}", userId);
                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed by client", CancellationToken.None);
                    // Removal is handled in the finally block or after the loop
                    break; // Exit the loop
                }

                if (result.MessageType == WebSocketMessageType.Text)
                {
                    var messageJson = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    _logger.LogDebug("Received message from User ID {UserId}: {MessageJson}", userId, messageJson);

                    MessageDto messageDto;
                    try
                    {
                        messageDto = JsonConvert.DeserializeObject<MessageDto>(messageJson);
                    }
                    catch (JsonException jsonEx)
                    {
                        _logger.LogWarning(jsonEx, "Failed to deserialize message from User ID {UserId}. Message: {MessageJson}", userId, messageJson);
                        // Optionally send an error back to the client or just close
                        await webSocket.CloseAsync(WebSocketCloseStatus.InvalidPayloadData, "Malformed message format.", CancellationToken.None);
                        break; // Exit loop as connection is being closed
                    }


                    if (messageDto != null)
                    {
                        messageDto.SenderId = userId; // Ensure SenderId is the authenticated user

                        // Validate ReceiverId (optional but good)
                        if (messageDto.ReceiverId <= 0)
                        {
                            _logger.LogWarning("Invalid ReceiverId {ReceiverId} from User ID {UserId}. Message: {MessageJson}", messageDto.ReceiverId, userId, messageJson);
                            // Decide how to handle: ignore, error back to sender, or close.
                            // For now, we'll just log and not process/broadcast.
                            continue;
                        }

                        await ProcessMessageAsync(messageDto);
                        await BroadcastMessageAsync(messageDto);
                    }
                    else
                    {
                        _logger.LogWarning("Deserialized message DTO is null from User ID {UserId}. Message: {MessageJson}", userId, messageJson);
                    }
                }
            }
        }
        catch (WebSocketException wsEx) when (wsEx.WebSocketErrorCode == WebSocketError.ConnectionClosedPrematurely)
        {
            _logger.LogWarning(wsEx, "WebSocket connection (User ID: {UserId}) closed prematurely.", userId);
            // Client likely disconnected without a proper close handshake.
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in WebSocket receive loop for User ID: {UserId}. Closing connection.", userId);
            if (webSocket.State == WebSocketState.Open || webSocket.State == WebSocketState.CloseReceived)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.InternalServerError, "An unexpected error occurred.", CancellationToken.None);
            }
        }
        finally
        {
            if (_connectedClients.TryRemove(userId, out var removedSocket))
            {
                // If the removed socket is the current one, ensure it's disposed if not already.
                // The 'using' statement around WebSocket in ASP.NET Core usually handles disposal.
                if (removedSocket == webSocket)
                {
                    _logger.LogInformation("WebSocket connection for User ID: {UserId} removed from connected clients. Total clients: {ClientCount}", userId, _connectedClients.Count);
                }
                else
                {
                    // This case might happen if a new connection replaced an old one, and the old one is being cleaned up.
                    _logger.LogInformation("An older WebSocket instance for User ID: {UserId} was removed. Total clients: {ClientCount}", userId, _connectedClients.Count);
                }
            }
            else
            {
                _logger.LogWarning("Could not remove WebSocket for User ID: {UserId} from connected clients. It might have been removed already or never fully added.", userId);
            }
            // webSocket.Dispose(); // Generally, ASP.NET Core manages the lifetime of the WebSocket accepted by the middleware.
        }
    }

    private async Task ProcessMessageAsync(MessageDto messageDto)
    {
        var messageEntity = new Message
        {
            SenderId = messageDto.SenderId,
            ReceiverId = messageDto.ReceiverId,
            Message1 = messageDto.Content,
            // Timestamp = DateTime.UtcNow // Good to add a timestamp for when message was processed/saved
        };

        _context.Messages.Add(messageEntity);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Message from {SenderId} to {ReceiverId} saved to database.", messageDto.SenderId, messageDto.ReceiverId);
        messageDto.MessageId = messageEntity.MessageId; // Populate MessageId back to DTO if needed for broadcast
    }

    private async Task BroadcastMessageAsync(MessageDto messageDto)
    {
        if (_connectedClients.TryGetValue(messageDto.ReceiverId, out var receiverSocket))
        {
            if (receiverSocket.State == WebSocketState.Open)
            {
                var messageJson = JsonConvert.SerializeObject(messageDto);
                var messageBytes = Encoding.UTF8.GetBytes(messageJson);
                _logger.LogInformation("Broadcasting message from {SenderId} to User ID: {ReceiverId}", messageDto.SenderId, messageDto.ReceiverId);
                await receiverSocket.SendAsync(new ArraySegment<byte>(messageBytes), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            else
            {
                _logger.LogWarning("Receiver User ID: {ReceiverId} found but socket state is {SocketState}. Message not sent.", messageDto.ReceiverId, receiverSocket.State);
            }
        }
        else
        {
            _logger.LogInformation("Receiver User ID: {ReceiverId} not connected. Message from {SenderId} not broadcasted in real-time.", messageDto.ReceiverId, messageDto.SenderId);
            // This is normal if the receiver is offline. Message is saved, will be fetched via history.
        }
    }
}