using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Gym_project.Data;
using Gym_project.Models;
using Gym_project.DTO;

public class WebSocketHandler
{
    private readonly GymDbContext _context;
    private readonly Dictionary<int, WebSocket> _connectedClients = new();

    // Constructor expects GymDbContext via DI
    public WebSocketHandler(GymDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task HandleWebSocketConnectionAsync(HttpContext httpContext, WebSocket webSocket)
    {
        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            await webSocket.CloseAsync(WebSocketCloseStatus.InvalidPayloadData, "Invalid user ID", CancellationToken.None);
            return;
        }

        _connectedClients[userId] = webSocket;

        var buffer = new byte[1024 * 4];
        while (webSocket.State == WebSocketState.Open)
        {
            try
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed by client", CancellationToken.None);
                    _connectedClients.Remove(userId);
                    return;
                }

                var messageJson = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var messageDto = JsonConvert.DeserializeObject<MessageDto>(messageJson);

                if (messageDto != null)
                {
                    messageDto.SenderId = userId;
                    await ProcessMessageAsync(messageDto);
                    await BroadcastMessageAsync(messageDto);
                }
            }
            catch (Exception ex)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.InternalServerError, "Error encountered", CancellationToken.None);
                _connectedClients.Remove(userId);
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }

    private async Task ProcessMessageAsync(MessageDto messageDto)
    {
        var messageEntity = new Message
        {
            SenderId = messageDto.SenderId,
            ReceiverId = messageDto.ReceiverId,
            Message1 = messageDto.Content,
        };

        _context.Messages.Add(messageEntity);
        await _context.SaveChangesAsync();
    }

    private async Task BroadcastMessageAsync(MessageDto messageDto)
    {
        if (_connectedClients.TryGetValue(messageDto.ReceiverId, out var receiverSocket) && receiverSocket.State == WebSocketState.Open)
        {
            var messageBytes = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(messageDto));
            await receiverSocket.SendAsync(new ArraySegment<byte>(messageBytes), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}