using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gym_Backend.Data;
using Gym_Backend.Models;

namespace Gym_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembershipsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MembershipsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/memberships/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Membership>>> GetAll()
        {
            return await _context.Memberships.ToListAsync();
        }

        // GET: api/memberships/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Membership>> GetById(int id)
        {
            var membership = await _context.Memberships.FindAsync(id);
            if (membership == null)
                return NotFound();

            return membership;
        }

        // POST: api/memberships/add
        //[HttpPost("add")]
        //public async Task<ActionResult<Membership>> Add(Membership membership)
        //{
        //    _context.Memberships.Add(membership);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetById), new { id = membership.Id }, membership);
        //}

        [HttpPost("add")]
        public async Task<ActionResult<Membership>> Add(Membership membership)
        {
            // Check if membership with the same name already exists
            var existingMembership = await _context.Memberships
                .FirstOrDefaultAsync(m => m.Name.ToLower() == membership.Name.ToLower());

            if (existingMembership != null)
            {
                return BadRequest($"Membership with the name '{membership.Name}' already exists.");
            }

            _context.Memberships.Add(membership);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = membership.Id }, membership);
        }

        // PUT: api/memberships/update/{id}
        //[HttpPut("update/{id}")]
        //public async Task<IActionResult> Update(int id, Membership updated)
        //{
        //    var membership = await _context.Memberships.FindAsync(id);
        //    if (membership == null)
        //        return NotFound();

        //    membership.Name = updated.Name;
        //    membership.Duration = updated.Duration;
        //    membership.Price = updated.Price;
        //    membership.Benefits = updated.Benefits;

        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, Membership updated)
        {
            var membership = await _context.Memberships.FindAsync(id);
            if (membership == null)
                return NotFound();

            // Check if there is another membership with the same name
            var existingMembership = await _context.Memberships
                .FirstOrDefaultAsync(m => m.Name.ToLower() == updated.Name.ToLower() && m.Id != id);

            if (existingMembership != null)
            {
                return BadRequest($"Another membership with the name '{updated.Name}' already exists.");
            }

            membership.Name = updated.Name;
            membership.Duration = updated.Duration;
            membership.Price = updated.Price;
            membership.Benefits = updated.Benefits;

            await _context.SaveChangesAsync();
            return NoContent();
        }


        // DELETE: api/memberships/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var membership = await _context.Memberships.FindAsync(id);
            if (membership == null)
                return NotFound();

            _context.Memberships.Remove(membership);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
