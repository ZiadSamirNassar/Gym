using Gym_project.Data;
using Gym_project.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Gym_project.DTO;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly GymDbContext _context;

        public MessageController(GymDbContext context)
        {
            _context = context;
        }

        // GET /messages/{userId}
        [HttpGet("{userId}")]
        [Authorize(Roles = "member, trainer")]
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
                    Content = m.Message1
                })
                .ToListAsync();

            return Ok(new { data = messages });
        }
    }
}