//using Microsoft.AspNetCore.Mvc;
//using Gym_Backend.Models;
//using Gym_Backend.Data;
//using Microsoft.AspNetCore.Identity;

//namespace Gym_Backend.Controllers
//{
//    [ApiController]
//    [Route("api/admins")]
//    public class AdminController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public AdminController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost("add")]
//        public async Task<IActionResult> AddAdmin([FromBody] Admin model)
//        {
//            if (_context.Admins.Any(a => a.Username == model.Username))
//                return BadRequest(new { message = "Username already exists." });

//            var hasher = new PasswordHasher<Admin>();
//            model.Password = hasher.HashPassword(model, model.Password);

//            _context.Admins.Add(model);
//            await _context.SaveChangesAsync();
//            return Ok(new { message = "Admin created successfully." });
//        }

//        [HttpGet("all")]
//        public IActionResult GetAdmins()
//        {
//            return Ok(_context.Admins.ToList());
//        }
//    }
//}



using Gym_Backend.Data;
using Gym_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gym_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }

        // POST: api/admin/add
        [HttpPost("add")]
        public async Task<ActionResult<Admin>> AddAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetAdmin", new { id = admin.Id }, admin);
        }

        // PUT: api/admin/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateAdmin(int id, Admin admin)
        {
            if (id != admin.Id)
            {
                return BadRequest();
            }

            _context.Entry(admin).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/admin/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

