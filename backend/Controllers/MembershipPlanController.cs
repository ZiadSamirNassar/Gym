using Gym_project.Data;
using Gym_project.Models;
using Gym_project.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MembershipPlanController : ControllerBase
    {
        private readonly GymDbContext _context;

        public MembershipPlanController(GymDbContext context)
        {
            _context = context;
        }

        // GET /membershipplan
        [HttpGet]
        public async Task<IActionResult> GetPlans()
        {
            var plans = await _context.MembershipPlans
                .Select(p => new MembershipPlanDto
                {
                    PlanId = p.PlanId,
                    Name = p.Name,
                    Duration = p.Duration,
                    Price = p.Price,
                    Benefits = p.Benefits,
                    PersonalSessions = p.PersonalSessions
                }).ToListAsync();
            return Ok(plans);
        }

        // GET /membershipplan/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlanById(int id)
        {
            var plan = await _context.MembershipPlans.FindAsync(id);
            if (plan == null)
                return NotFound();

            var dto = new MembershipPlanDto
            {
                PlanId = plan.PlanId,
                Name = plan.Name,
                Duration = plan.Duration,
                Price = plan.Price,
                Benefits = plan.Benefits,
                PersonalSessions = plan.PersonalSessions
            };
            return Ok(dto);
        }

        // POST /membershipplan  [Admin only]
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreatePlan([FromBody] CreateMembershipPlanDto dto)
        {
            var plan = new MembershipPlan
            {
                Name = dto.Name,
                Duration = dto.Duration,
                Price = dto.Price,
                Benefits = dto.Benefits,
                PersonalSessions = dto.PersonalSessions
            };

            _context.MembershipPlans.Add(plan);
            await _context.SaveChangesAsync();

            var resultDto = new MembershipPlanDto
            {
                PlanId = plan.PlanId,
                Name = plan.Name,
                Duration = plan.Duration,
                Price = plan.Price,
                Benefits = plan.Benefits,
                PersonalSessions = plan.PersonalSessions
            };

            return CreatedAtAction(nameof(GetPlanById), new { id = plan.PlanId }, resultDto);
        }

        // PUT /membershipplan/{id} [Admin only]
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] UpdateMembershipPlanDto dto)
        {
            var plan = await _context.MembershipPlans.FindAsync(id);
            if (plan == null)
                return NotFound();

            plan.Name = dto.Name;
            plan.Duration = dto.Duration;
            plan.Price = dto.Price;
            plan.Benefits = dto.Benefits;
            plan.PersonalSessions = dto.PersonalSessions;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE /membershipplan/{id} [Admin only]
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.MembershipPlans.FindAsync(id);
            if (plan == null)
                return NotFound();

            _context.MembershipPlans.Remove(plan);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}