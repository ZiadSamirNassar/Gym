using Gym_project.Data;
using Gym_project.DTO;
using Gym_project.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Collections.Generic;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly GymDbContext _context;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IUserConnectionManager _userConnectionManager;

        public MessageController(GymDbContext context, IHubContext<ChatHub> hubContext, IUserConnectionManager userConnectionManager)
        {
            _context = context;
            _hubContext = hubContext;
            _userConnectionManager = userConnectionManager;
        }

        // POST /messages
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SendMessage(MessageDto messageDto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var message = new Message
            {
                SenderId = currentUserId,
                ReceiverId = messageDto.ReceiverId,
                Message1 = messageDto.Content
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Get the receiver's connection ID from the mapping
            var receiverConnectionId = _userConnectionManager.GetConnectionId(messageDto.ReceiverId.ToString());

            if (receiverConnectionId != null)
            {
                await _hubContext.Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", currentUserId, messageDto.Content);
            }

            return Ok();
        }

        // GET /messages/{userId}
        [HttpGet("{userId}")]
        // [Authorize]
        public async Task<IActionResult> GetMessagesWithUser(int userId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var messages = await _context.Messages
                .Where(m => (m.SenderId == currentUserId && m.ReceiverId == userId) ||
                            (m.SenderId == userId && m.ReceiverId == currentUserId))
                .Select(m => new MessageDto
                {
                    MessageId = m.MessageId,
                    SenderId = m.SenderId,
                    ReceiverId = m.ReceiverId,
                    Content = m.Message1,
                    Timestamp = m.Timestamp
                })
                .ToListAsync();

            return Ok(new { data = messages });
        }
    }
}