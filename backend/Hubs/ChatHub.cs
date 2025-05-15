using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task PrivateMessage(string user, string receiverId, string message)
    {
        await Clients.User(receiverId).SendAsync("ReceiveMessage", user, message);
    }
}