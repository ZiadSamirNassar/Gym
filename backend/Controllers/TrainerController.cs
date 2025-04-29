//using Microsoft.AspNetCore.Mvc;
//using Gym_Backend.Models;
//using Gym_Backend.Data;
//using Microsoft.AspNetCore.Identity;

//namespace Gym_Backend.Controllers
//{
//    [ApiController]
//    [Route("api/trainers")]
//    public class TrainerController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public TrainerController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost("add")]
//        public async Task<IActionResult> AddTrainer([FromBody] Trainer model)
//        {
//            if (_context.Trainers.Any(t => t.Username == model.Username))
//                return BadRequest(new { message = "Username already exists." });

//            var hasher = new PasswordHasher<Trainer>();
//            model.Password = hasher.HashPassword(model, model.Password);

//            _context.Trainers.Add(model);
//            await _context.SaveChangesAsync();
//            return Ok(new { message = "Trainer created successfully." });
//        }

//        [HttpGet("all")]
//        public IActionResult GetTrainers()
//        {
//            return Ok(_context.Trainers.ToList());
//        }
//    }
//}
