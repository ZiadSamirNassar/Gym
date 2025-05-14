using Gym_project.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gym_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly GymDbContext _context;

        public MembersController(GymDbContext context)
        {
            _context = context;
        }

        // GET /Members
        [HttpGet]
        [Authorize(Roles = "admin, trainer")]

        public async Task<IActionResult> GetAllMembers()
        {
            var members = await _context.Members.ToListAsync();
            return Ok(new { data = members });
        }

        // GET /Members/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMemberById(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(new { data = member });
        }
    }
}