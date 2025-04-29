using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gym_Backend.Data;
using Gym_Backend.Models;

namespace Gym_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TrainersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Trainers/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Trainer>>> GetAllTrainers()
        {
            return await _context.Trainers.ToListAsync();
        }

        // GET: api/Trainers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Trainer>> GetTrainer(int id)
        {
            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null) return NotFound();
            return trainer;
        }

        // POST: api/Trainers/add
        [HttpPost("add")]
        public async Task<ActionResult<Trainer>> AddTrainer([FromBody] Trainer trainer)
        {
            // Store password as plaintext (Not Recommended for Production)
            if (!string.IsNullOrEmpty(trainer.Password))
            {
                // No hashing, store the password directly
            }

            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTrainer), new { id = trainer.Id }, trainer);
        }

        // PUT: api/Trainers/update/{id}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateTrainer(int id, [FromBody] Trainer updatedTrainer)
        {
            if (id != updatedTrainer.Id)
                return BadRequest("Trainer ID mismatch.");

            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null) return NotFound();

            trainer.FirstName = updatedTrainer.FirstName;
            trainer.LastName = updatedTrainer.LastName;
            trainer.Email = updatedTrainer.Email;
            trainer.Username = updatedTrainer.Username;

            // Store password as plaintext (No hashing)
            if (!string.IsNullOrEmpty(updatedTrainer.Password))
            {
                trainer.Password = updatedTrainer.Password;
            }

            trainer.Specialization = updatedTrainer.Specialization;
            trainer.Experience = updatedTrainer.Experience;
            trainer.Role = updatedTrainer.Role;

            await _context.SaveChangesAsync();
            return Ok(trainer);
        }

        // DELETE: api/Trainers/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null) return NotFound();

            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
