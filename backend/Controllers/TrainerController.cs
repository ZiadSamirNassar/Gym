using Gym_project.Data;
using Gym_project.Models;
using Gym_project.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gym_project.DTO;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrainerController : ControllerBase
    {
        private readonly GymDbContext _context;

        public TrainerController(GymDbContext context)
        {
            _context = context;
        }

        // GET /trainer
        [HttpGet]
        public async Task<IActionResult> GetAllTrainers()
        {
            var trainers = await _context.Trainers
                .Include(t => t.TrainerNavigation)
                .Select(t => new TrainerDto
                {
                    TrainerId = t.TrainerId,
                    Name = t.Name,
                    Age = t.Age,
                    Username = t.TrainerNavigation.Username
                })
                .ToListAsync();

            return Ok(trainers);
        }


        // without using DTO
        //[HttpGet]
        //public async Task<IActionResult> GetAllTrainers()
        //{
        //    var trainers = await _context.Trainers.ToListAsync();
        //    return Ok(trainers);
        //}


        // POST /trainer (Admin only)
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateTrainer([FromBody] CreateTrainerDto dto)
        {
            // Check for unique username
            if (_context.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            // Create User entity
            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password, // Hash in prod!
                Type = "trainer"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create Trainer with PK = user.UserId
            var trainer = new Trainer
            {
                TrainerId = user.Id ,
                Name = dto.Name,
                Age = dto.Age,
                TrainerNavigation = user
            };
            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();

            var result = new TrainerDto
            {
                TrainerId = trainer.TrainerId,
                Name = trainer.Name,
                Age = trainer.Age,
                Username = user.Username
            };

            return CreatedAtAction(nameof(GetAllTrainers), new { id = trainer.TrainerId }, result);
        }

        // PUT /trainer/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateTrainer(int id, [FromBody] UpdateTrainerDto dto)
        {
            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null)
                return NotFound();

            trainer.Name = dto.Name;
            trainer.Age = dto.Age;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}