using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;

public interface IUserConnectionManager
{
    void AddConnection(string userId, string connectionId);
    string GetConnectionId(string userId);
    void RemoveConnection(string connectionId);
}

public class UserConnectionManager : IUserConnectionManager
{
    private readonly Dictionary<string, string> _userConnectionMap = new Dictionary<string, string>();
    private readonly Dictionary<string, string> _connectionUserMap = new Dictionary<string, string>();

    public void AddConnection(string userId, string connectionId)
    {
        if (!_userConnectionMap.ContainsKey(userId))
        {
            _userConnectionMap.Add(userId, connectionId);
        }
        else
        {
            _userConnectionMap[userId] = connectionId;
        }

        if (!_connectionUserMap.ContainsKey(connectionId))
        {
            _connectionUserMap.Add(connectionId, userId);
        }
    }

    public string GetConnectionId(string userId)
    {
        if (_userConnectionMap.TryGetValue(userId, out string connectionId))
        {
            return connectionId;
        }
        return null;
    }

    public void RemoveConnection(string connectionId)
    {
        if (_connectionUserMap.TryGetValue(connectionId, out string userId))
        {
            _connectionUserMap.Remove(connectionId);
            _userConnectionMap.Remove(userId);
        }
    }
}

public class ChatHub : Hub
{
    private readonly IUserConnectionManager _userConnectionManager;

    public ChatHub(IUserConnectionManager userConnectionManager)
    {
        _userConnectionManager = userConnectionManager;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.GetHttpContext().Request.Query["userId"].ToString();
        _userConnectionManager.AddConnection(userId, Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        _userConnectionManager.RemoveConnection(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}