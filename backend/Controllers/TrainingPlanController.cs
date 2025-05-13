using Gym_project.Data;
using Gym_project.Models;
using Gym_project.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Gym_project.DTO;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrainingPlanController : ControllerBase
    {
        private readonly GymDbContext _context;

        public TrainingPlanController(GymDbContext context)
        {
            _context = context;
        }

        // GET /trainingplans
        [HttpGet]
        public async Task<IActionResult> GetTrainingPlans()
        {
            var plans = await _context.TrainingPlans
                .Select(p => new TrainingPlanDto
                {
                    PlanId = p.PlanId,
                    MemberId = p.MemberId,
                    TrainerId = p.TrainerId,
                    ExerciseName = p.ExerciseName,
                    Duration = p.Duration,
                    Level = p.Level
                })
                .ToListAsync();

            return Ok(new { data = plans });
        }

        // POST /trainingplans [Trainer only]
        [HttpPost]
        [Authorize(Roles = "trainer")]
        public async Task<IActionResult> CreateTrainingPlan([FromBody] CreateTrainingPlanDto dto)
        {
            // Get the TrainerId from the current user via JWT claims
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId))
                return Unauthorized();

            // Lookup Trainer entity by user ID (since TrainerId == UserId)
            var trainer = await _context.Trainers.FindAsync(userId);
            if (trainer == null)
                return NotFound("Trainer profile not found.");

            var plan = new TrainingPlan
            {
                MemberId = dto.MemberId,
                TrainerId = trainer.TrainerId,
                ExerciseName = dto.ExerciseName,
                Duration = dto.Duration,
                Level = dto.Level
            };

            _context.TrainingPlans.Add(plan);
            await _context.SaveChangesAsync();

            var result = new TrainingPlanDto
            {
                PlanId = plan.PlanId,
                MemberId = plan.MemberId,
                TrainerId = plan.TrainerId,
                ExerciseName = plan.ExerciseName,
                Duration = plan.Duration,
                Level = plan.Level
            };

            return CreatedAtAction(nameof(GetTrainingPlans), new { id = plan.PlanId }, result);
        }
    }
}