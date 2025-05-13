using Gym_project.Data;
using Microsoft.AspNetCore.Mvc;
using Gym_project.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Gym_project.DTO;
using Gym_project.Models;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProgressReportController : ControllerBase
    {
        private readonly GymDbContext _context;

        public ProgressReportController(GymDbContext context)
        {
            _context = context;
        }

        // GET /progressreport/{memberId}
        [HttpGet("{memberId}")]
        [Authorize] // Only authenticated users can access
        public async Task<IActionResult> GetProgressReportsForMember(int memberId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (currentUserRole == "member")
            {
                // Get THIS member id
                var member = await _context.Members
                    .FirstOrDefaultAsync(m => m.MemberNavigation.Id == currentUserId);
                if (member == null || member.MemberId != memberId)
                    return Forbid(); // Not your data!
            }
            else if (currentUserRole == "trainer")
            {
                // Get list of this trainer's assigned member ids (e.g. by training plans)
                var isAssigned = await _context.TrainingPlans
                    .AnyAsync(tp => tp.TrainerId == currentUserId );

                if (!isAssigned)
                    return Forbid(); 
            }


            var reports = await _context.ProgressReports
                .Where(r => r.MemberId == memberId)
                .Include(r => r.Trainer)
                .Select(r => new ProgressReportDto
                {
                    ReportId = r.ReportId,
                    MemberId = r.MemberId,
                    MemberName = r.Member != null ? r.Member.Name : null,
                    TrainerId = r.TrainerId,
                    TrainerName = r.Trainer != null ? r.Trainer.Name : null,
                    Date = r.Date,
                    Weight = r.Weight,
                    BodyFatPercentage = r.BodyFatPercentage,
                    PerformanceNotes = r.PerformanceNotes
                })
                .ToListAsync();

            return Ok(new { data = reports });
        }

        [HttpPost]
        [Authorize(Roles = "trainer")]
        public async Task<IActionResult> CreateProgressReport([FromBody] CreateProgressReportDto dto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Check if member is assigned to this trainer (via TrainingPlan)
            var isAssigned = await _context.TrainingPlans
                .AnyAsync(tp => tp.TrainerId == currentUserId && tp.MemberId == dto.MemberId);

            if (!isAssigned)
                return Forbid("You cannot create a report for this member.");

            var report = new ProgressReport
            {
                MemberId = dto.MemberId,
                TrainerId = currentUserId,
                Date = dto.Date,
                Weight = dto.Weight,
                BodyFatPercentage = dto.BodyFatPercentage,
                PerformanceNotes = dto.PerformanceNotes
            };

            _context.ProgressReports.Add(report);
            await _context.SaveChangesAsync();

            return Ok(new { report.ReportId });
        }
    }
}