using Microsoft.AspNetCore.Mvc;
using Gym_Backend.Data;
using Gym_Backend.Models;
using Microsoft.EntityFrameworkCore;


namespace GymManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupTrainingSessionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GroupTrainingSessionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/grouptrainingsessions/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllSessions()
        {
            var sessions = await _context.GroupTrainingSessions.ToListAsync();
            return Ok(sessions);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddSession([FromBody] GroupTrainingSession session)
        {
            // Check if the trainer exists
            var trainerExists = await _context.Trainers
                .AnyAsync(t => t.Username == session.TrainerName);

            if (!trainerExists)
            {
                return BadRequest($"Trainer '{session.TrainerName}' does not exist.");
            }

            // Trainer exists, add the session
            _context.GroupTrainingSessions.Add(session);
            await _context.SaveChangesAsync();

            return Ok(session);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateSession(int id, [FromBody] GroupTrainingSession session)
        {
            // Check if the trainer exists in the Trainers table
            var trainerExists = await _context.Trainers
                .AnyAsync(t => t.Username == session.TrainerName);

            if (!trainerExists)
            {
                return BadRequest($"Trainer '{session.TrainerName}' does not exist.");
            }

            var existingSession = await _context.GroupTrainingSessions.FindAsync(id);
            if (existingSession == null)
            {
                return NotFound();
            }

            // Update session details
            existingSession.Title = session.Title;
            existingSession.Description = session.Description;
            existingSession.Date = session.Date;
            existingSession.Time = session.Time;
            existingSession.TrainerName = session.TrainerName;

            await _context.SaveChangesAsync();
            return Ok(existingSession);
        }

        // DELETE: api/grouptrainingsessions/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _context.GroupTrainingSessions.FindAsync(id);
            if (session == null)
            {
                return NotFound();
            }

            _context.GroupTrainingSessions.Remove(session);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
