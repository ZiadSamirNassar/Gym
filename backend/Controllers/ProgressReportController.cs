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
        [Authorize(Roles ="trainer,member")] // Only trainer and member
        public async Task<IActionResult> GetProgressReportsForMember(int memberId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;

            bool canAccess = false;

            if (currentUserRole == "member" && currentUserId == memberId)
            {
                canAccess = true; // Member can access their own reports
            }
            else if (currentUserRole == "trainer")
            {
                // Verify if trainer is assigned to this member
                canAccess = await _context.TrainingPlans.AnyAsync(tp => tp.TrainerId == currentUserId && tp.MemberId == memberId);
            }

            if (!canAccess)
                return Forbid();

            var reports = await _context.ProgressReports
                .Where(r => r.MemberId == memberId)
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

        // PATCH /progressreport/{reportId} [Member or Trainer update]
        [HttpPatch("{reportId}")]
        [Authorize (Roles ="trainer,member")] 
        public async Task<IActionResult> UpdateProgressReport(int reportId, [FromBody] UpdateProgressReportDto dto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var report = await _context.ProgressReports.FirstOrDefaultAsync(r => r.ReportId == reportId);
            if (report == null)
                return NotFound("Progress report not found.");

            if (currentUserRole == "member" && report.MemberId == currentUserId)
            {
                // Member can update their weight and body fat percentage
                report.Weight = dto.Weight ?? report.Weight;
                report.BodyFatPercentage = dto.BodyFatPercentage ?? report.BodyFatPercentage;
            }
            else if (currentUserRole == "trainer")
            {
                // Trainer can update performance notes if assigned to member
                var isAssigned = await _context.TrainingPlans.AnyAsync(tp => tp.TrainerId == currentUserId && tp.MemberId == report.MemberId);
                if (!isAssigned)
                    return Forbid("You cannot update the report for this member.");

                report.PerformanceNotes = dto.PerformanceNotes ?? report.PerformanceNotes;
            }
            else
            {
                return Forbid();
            }

            await _context.SaveChangesAsync();
            return Ok("Progress report updated successfully.");
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