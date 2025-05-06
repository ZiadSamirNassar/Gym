using System.Net.WebSockets;
using System.Text;
using System.Threading;

public static class WebSocketHandler
{
    public static async Task HandleWebSocketConnectionAsync(WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];
        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
            }
            else
            {
                // Echo the message back to the client
                await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);

                // Process the message, save to DB or broadcast to other clients
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                ProcessMessage(message);
            }
        }
    }

    private static void ProcessMessage(string message)
    {
        // Implement message processing logic here (e.g., save to DB, notify users...)
    }
}