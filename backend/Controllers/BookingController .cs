using Gym_project.Data;
using Gym_project.DTO;
using Gym_project.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly GymDbContext _context;

        public BookingController(GymDbContext context)
        {
            _context = context;
        }

        // GET /booking
        [HttpGet]
        [Authorize(Roles = "member")]
        public async Task<IActionResult> GetBookedSessions()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var bookings = await _context.Bookings
                .Where(b => b.MemberId == currentUserId)
                .Include(b => b.Session)
                .Select(b => new
                {
                    b.Session.SessionId,
                    b.Session.Type,
                    b.Session.Date,
                    b.Session.Duration
                })
                .ToListAsync();

            return Ok(new { data = bookings });
        }

        // POST /booking (Create a private session for the member )
        [HttpPost]
        [Authorize(Roles = "member")]
        public async Task<IActionResult> CreateAndBookPrivateSession([FromBody] CreatePrivateSessionDto dto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var session = new Session
            {
                Type = "private",
                Date = dto.Date,
                Duration = dto.Duration,
                Time = dto.Time,
                Name = dto.Name,
                TrainerId = dto.Trainer_id,
            };

                _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            var booking = new Booking
            {
                MemberId = currentUserId,
                SessionId = session.SessionId
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookedSessions), new { id = session.SessionId }, new { sessionId = session.SessionId, bookingId = booking.BookingId });
        }

        // POST /booking/{sessionId}
        [HttpPost("{sessionId}")]
        [Authorize(Roles = "member")]
        public async Task<IActionResult> BookSession(int sessionId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var session = await _context.Sessions.FindAsync(sessionId);
            if (session == null)
                return NotFound("Session not found.");

            if (session.Type == "private" && session.Bookings.Any())
                return BadRequest("Private session already booked.");

            var booking = new Booking
            {
                MemberId = currentUserId,
                SessionId = sessionId
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(new {data = booking.BookingId });
        }
    }
}