using Microsoft.AspNetCore.Mvc;
using Gym_Backend.Data;
using Gym_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalTrainingSessionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PersonalTrainingSessionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PersonalTrainingSessions
        [HttpGet]
        public async Task<IActionResult> GetSessions()
        {
            var sessions = await _context.PersonalTrainingSessions.ToListAsync();
            return Ok(sessions);
        }

        // GET: api/PersonalTrainingSessions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSession(int id)
        {
            var session = await _context.PersonalTrainingSessions.FindAsync(id);

            if (session == null)
                return NotFound();

            return Ok(session);
        }

        // POST: api/PersonalTrainingSessions
        [HttpPost]
        public async Task<IActionResult> CreateSession([FromBody] PersonalTrainingSession session)
        {
            if (session == null)
                return BadRequest();

            _context.PersonalTrainingSessions.Add(session);
            await _context.SaveChangesAsync();

            return Ok(session);
        }

        // PUT: api/PersonalTrainingSessions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSession(int id, [FromBody] PersonalTrainingSession updatedSession)
        {
            if (updatedSession == null || updatedSession.Id != id)
                return BadRequest();

            var existingSession = await _context.PersonalTrainingSessions.FindAsync(id);
            if (existingSession == null)
                return NotFound();

            existingSession.Title = updatedSession.Title;
            existingSession.Date = updatedSession.Date;
            existingSession.Time = updatedSession.Time;
            existingSession.DurationMinutes = updatedSession.DurationMinutes;
            existingSession.TrainerName = updatedSession.TrainerName;

            await _context.SaveChangesAsync();

            return Ok(existingSession);
        }

        // DELETE: api/PersonalTrainingSessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _context.PersonalTrainingSessions.FindAsync(id);
            if (session == null)
                return NotFound();

            _context.PersonalTrainingSessions.Remove(session);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
