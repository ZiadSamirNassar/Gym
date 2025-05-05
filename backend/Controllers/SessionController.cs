//using Gym_project.Data;
//using Gym_project.Models;
//using Gym_project.DTOs;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.EntityFrameworkCore;
//using System.Security.Claims;
//using Gym_project.DTO;

//namespace Gym_project.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class SessionController : ControllerBase
//    {
//        private readonly GymDbContext _context;

//        public SessionController(GymDbContext context)
//        {
//            _context = context;
//        }

//        // GET /sessions
//        [HttpGet]
//        public async Task<IActionResult> GetSessions()
//        {
//            var sessions = await _context.Sessions
//                .Select(s => new SessionDto
//                {
//                    SessionId = s.SessionId,
//                    TrainerId = s.TrainerId,
//                    Type = s.Type,
//                    Date = s.Date,
//                    Duration = s.Duration,
//                    MemberId = s.MemberId
//                })
//                .ToListAsync();

//            return Ok(sessions);
//        }

//        // POST /sessions [Admin or Trainer]
//        [HttpPost]
//        [Authorize(Roles = "trainer,admin")]
//        public async Task<IActionResult> CreateSession([FromBody] CreateSessionDto dto)
//        {
//            int? trainerId = null;

//            if (User.IsInRole("trainer"))
//            {
//                // If the user is a trainer, use the ID from the JWT.
//                trainerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
//            }
//            else if (User.IsInRole("admin"))
//            {
//                // If the user is an admin, they can specify a trainer ID in the request body.
//                if (dto.TrainerId.HasValue)
//                {
//                    var trainer = await _context.Trainers.FirstOrDefaultAsync(t => t.TrainerId == dto.TrainerId);
//                    if (trainer == null)
//                        return NotFound("Trainer not found.");

//                    trainerId = dto.TrainerId;
//                }
//                else
//                {
//                    return BadRequest("TrainerId must be specified by admin.");
//                }
//            }

//            var session = new Session
//            {
//                TrainerId = trainerId,
//                Type = dto.Type,
//                Date = dto.Date,
//                Duration = dto.Duration,
//                MemberId = dto.MemberId  // Or null for group session.
//            };

//            _context.Sessions.Add(session);
//            await _context.SaveChangesAsync();

//            var result = new SessionDto
//            {
//                SessionId = session.SessionId,
//                TrainerId = session.TrainerId,
//                Type = session.Type,
//                Date = session.Date,
//                Duration = session.Duration,
//                MemberId = session.MemberId
//            };

//            return CreatedAtAction(nameof(GetSessions), new { id = session.SessionId }, result);
//        }

//        // PUT /sessions/{id} [Admin or Trainer]
//        [HttpPut("{id}")]
//        [Authorize(Roles = "trainer,admin")]
//        public async Task<IActionResult> UpdateSession(int id, [FromBody] UpdateSessionDto dto)
//        {
//            var session = await _context.Sessions.FindAsync(id);

//            if (session == null)
//                return NotFound();

//            int currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
//            if (User.IsInRole("trainer") && session.TrainerId != currentUserId)
//            {
//                // Trainers can only update their own sessions.
//                return Forbid("You can only update your own sessions.");
//            }

//            session.Type = dto.Type;
//            session.Date = dto.Date;
//            session.Duration = dto.Duration;
//            session.MemberId = dto.MemberId;

//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        // DELETE /sessions/{id} [Admin only]
//        [HttpDelete("{id}")]
//        [Authorize(Roles = "admin")]
//        public async Task<IActionResult> DeleteSession(int id)
//        {
//            var session = await _context.Sessions.FindAsync(id);

//            if (session == null)
//                return NotFound();

//            _context.Sessions.Remove(session);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }
//    }
//}




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

        // GET /sessions
        [HttpGet]
        public async Task<IActionResult> GetSessions()
        {
            var sessions = await _context.Sessions
                .Select(s => new SessionDto
                {
                    SessionId = s.SessionId,
                    TrainerId = s.TrainerId,
                    Type = s.Type,
                    Date = s.Date,
                    Duration = s.Duration
                })
                .ToListAsync();

            return Ok(sessions);
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
                Duration = dto.Duration
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            var result = new SessionDto
            {
                SessionId = session.SessionId,
                TrainerId = session.TrainerId,
                Type = session.Type,
                Date = session.Date,
                Duration = session.Duration
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

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE /sessions/{id} [Admin only]
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
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