using Gym_Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Gym_Backend.Data;
using Gym_Backend.Models;
using Gym_Backend.DTOs;

namespace Gym_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JoinedSessionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Constructor injection of ApplicationDbContext
        public JoinedSessionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/JoinedSessions
        // The method will handle requests to join a session
        [HttpPost]
        public async Task<ActionResult<JoinedSession>> PostJoinedSession(JoinedSession joinedSession)
        {
            // Check if the username is empty or null
            if (string.IsNullOrWhiteSpace(joinedSession.Username))
            {
                return BadRequest("Username is required.");
            }

            // Add the new joined session to the database
            _context.JoinedSessions.Add(joinedSession);

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return a response indicating that the session was successfully created
            return CreatedAtAction("GetJoinedSession", new { id = joinedSession.Id }, joinedSession);
        }

        // GET: api/JoinedSessions
        // This will return all the joined sessions (can be customized further to filter by member, date, etc.)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JoinedSession>>> GetJoinedSessions()
        {
            return await _context.JoinedSessions.ToListAsync();
        }

        // GET: api/JoinedSessions/{id}
        // This will return a specific joined session by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<JoinedSession>> GetJoinedSession(int id)
        {
            var joinedSession = await _context.JoinedSessions.FindAsync(id);

            if (joinedSession == null)
            {
                return NotFound();
            }

            return joinedSession;
        }

        // DELETE: api/JoinedSessions/{id}
        // This will handle the deletion of a joined session by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJoinedSession(int id)
        {
            var joinedSession = await _context.JoinedSessions.FindAsync(id);
            if (joinedSession == null)
            {
                return NotFound();
            }

            _context.JoinedSessions.Remove(joinedSession);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }
        // Inside your JoinedSessionsController.cs
        [HttpGet("check")]
        public async Task<ActionResult<bool>> CheckIfUserAlreadyJoined(string username, string sessionTitle)
        {
            var exists = await _context.JoinedSessions
                .AnyAsync(js => js.Username == username && js.SessionTitle == sessionTitle);

            return Ok(new { alreadyJoined = exists });
        }




    }
}