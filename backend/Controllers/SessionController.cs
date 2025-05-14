using Gym_project.Data;
using Gym_project.Models;
using Gym_project.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Gym_project.DTO;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SessionController : ControllerBase
    {
        private readonly GymDbContext _context;

        public SessionController(GymDbContext context)
        {
            _context = context;
        }

        // GET /sessions   ( group sessions only)
        [HttpGet]
        public async Task<IActionResult> GetSessions()
        {
            var groupSessions = await _context.Sessions
                .Where(s => s.Type.ToLower() == "group")
                .Select(s => new SessionDto
                {
                    SessionId = s.SessionId,
                    TrainerId = s.TrainerId,
                    Type = s.Type,
                    Date = s.Date,
                    Duration = s.Duration,
                    Name = s.Name,
                    Time = s.Time
                })
                .ToListAsync();

            return Ok(new { data = groupSessions });
        }


        // GET: /sessions/member/private [Member only]
        [HttpGet]
        [Route("sessions/member/private")]
        [Authorize(Roles = "member")]
        public async Task<IActionResult> GetPrivateSessionsForMember()
        {
            // Retrieve the member ID from the claims
            var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var memberId))
            {
                return Unauthorized("User is not authorized.");
            }

            var privateSessions = await _context.Bookings
                .Where(b => b.MemberId == memberId)
                .Select(b => b.Session)
                .Where(s => s.Type == "private")
                .Select(s => new SessionDto
                {
                    SessionId = s.SessionId,
                    TrainerId = s.TrainerId,
                    Type = s.Type,
                    Date = s.Date,
                    Duration = s.Duration,
                    Name = s.Name,
                    Time = s.Time,

                })
                .ToListAsync();

            return Ok(new { data = privateSessions });
        }


        // GET: /sessions/trainer [Trainer only]
        [HttpGet]
        [Route("sessions/trainer")]
        [Authorize(Roles = "trainer")]
        public async Task<IActionResult> GetSessionsForTrainer()
        {
            // Retrieve the trainer ID from the claims
            var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var trainerId))
            {
                return Unauthorized("User is not authorized.");
            }

            var sessions = await _context.Sessions
                .Where(s => s.TrainerId == trainerId) // Filter by logged-in trainer's ID
                .Select(s => new SessionDto
                {
                    SessionId = s.SessionId,
                    TrainerId = s.TrainerId,
                    Type = s.Type,
                    Date = s.Date,
                    Duration = s.Duration,
                    Name = s.Name ,
                    Time = s.Time,
                })
                .ToListAsync();

            return Ok(new { data = sessions });
        }

        // POST /sessions [Admin only]
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateSession([FromBody] CreateSessionDto dto)
        {
            if (!dto.TrainerId.HasValue)
                return BadRequest("TrainerId must be specified.");

            var trainer = await _context.Trainers.FindAsync(dto.TrainerId);
            if (trainer == null)
                return NotFound("Trainer not found.");

            var session = new Session
            {
                TrainerId = dto.TrainerId,
                Type = dto.Type,
                Date = dto.Date,
                Duration = dto.Duration,
                Time = dto.Time,
                Name = dto.Name
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            var result = new SessionDto
            {
                SessionId = session.SessionId,
                TrainerId = session.TrainerId,
                Type = session.Type,
                Date = session.Date,
                Duration = session.Duration,
                Name = session.Name,
                Time = session.Time
            };

            return CreatedAtAction(nameof(GetSessions), new { id = session.SessionId }, result);
        }

        // PUT /sessions/{id} [Admin only]
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateSession(int id, [FromBody] UpdateSessionDto dto)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
                return NotFound();

            session.Type = dto.Type;
            session.Date = dto.Date;
            session.Duration = dto.Duration;
            session.Time = dto.Time;
            session.Name = dto.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE /sessions/{id} [Admin only]
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, member")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
                return NotFound();

            _context.Sessions.Remove(session);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}