//using Microsoft.AspNetCore.Mvc;
//using Gym_Backend.Models;
//using Gym_Backend.Data;
//using Microsoft.AspNetCore.Identity;
//using System.Threading.Tasks;
//using System.Linq;

//namespace Gym_Backend.Controllers
//{
//    [ApiController]
//    [Route("api/auth")]
//    public class AuthController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public AuthController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost("register")]
//        public async Task<IActionResult> Register([FromBody] RegisterModel model)
//        {
//            if (_context.Users.Any(u => u.Username == model.Username) ||
//    _context.Admins.Any(a => a.Username == model.Username) ||
//    _context.Trainers.Any(t => t.Username == model.Username))
//            {
//                return BadRequest(new { message = "Username already exists." });
//            }

//            var hasher = new PasswordHasher<User>();
//            var user = new User
//            {
//                FirstName = model.FirstName,
//                LastName = model.LastName,
//                Email = model.Email,
//                Username = model.Username,
//                Password = "", // will be set below
//                Age = model.Age,
//                Plan = model.Plan,
//                Type = "Member" // default
//            };
//            user.Password = hasher.HashPassword(user, model.Password);

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();

//            return Ok(new { message = "Registration successful" });
//        }

//        [HttpPost("login")]
//        public IActionResult Login([FromBody] LoginModel model)
//        {
//            if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
//                return BadRequest(new { message = "Username and password are required." });

//            var hasher = new PasswordHasher<User>(); // Using PasswordHasher<User> for consistency

//            //// 1. Check in Users table
//            //var user = _context.Users.FirstOrDefault(u => u.Username == model.Username);
//            //if (user != null)
//            //{
//            //    var result = hasher.VerifyHashedPassword(user, user.Password, model.Password);
//            //    if (result == PasswordVerificationResult.Success)
//            //    {
//            //        return Ok(new
//            //        {
//            //            message = "Login successful!",
//            //            username = user.Username,
//            //            type = user.Type, // could be "Member", etc.
//            //            token = "dummy-token"
//            //        });
//            //    }
//            //}



//            // 1. Check in Users table
//            var user = _context.Users.FirstOrDefault(u => u.Username == model.Username);

//            if (user != null)
//            {
//                var result = hasher.VerifyHashedPassword(user, user.Password, model.Password);
//                if (result == PasswordVerificationResult.Success)
//                {
//                    // 2. Check if user is subscribed AFTER successful login
//                    var isSubscribed = _context.Subscriptions.Any(s => s.Username == model.Username);

//                    if (isSubscribed)
//                    {
//                        return Ok(new
//                        {
//                            message = "Login successful!",
//                            username = user.Username,
//                            type = "Member",
//                            status = "subscribed",
//                            token = "dummy-token"
//                        });
//                    }
//                    else
//                    {
//                        return Ok(new
//                        {
//                            message = "Login successful!",
//                            username = user.Username,
//                            type = "Member",
//                            token = "dummy-token"
//                        });
//                    }
//                }

//            }
//            // 3. If user not found or password incorrect
//            return Unauthorized(new { message = "Invalid username or password." });







//            var admin = _context.Admins.FirstOrDefault(a => a.Username == model.Username);
//            if (admin != null)
//            {
//                // Directly compare the stored password with the input password
//                if (admin.Password == model.Password)
//                {
//                    return Ok(new
//                    {
//                        message = "Login successful!",
//                        username = admin.Username,
//                        type = "Admin",
//                        token = "dummy-token"
//                    });
//                }
//            }

//            // 3. Check in Trainers table (plain text comparison for Trainer)
//            var trainer = _context.Trainers.FirstOrDefault(t => t.Username == model.Username);
//            if (trainer != null)
//            {
//                // Plain text comparison for Trainer
//                if (trainer.Password == model.Password)
//                {
//                    return Ok(new
//                    {
//                        message = "Login successful!",
//                        username = trainer.Username,
//                        type = "Trainer",
//                        token = "dummy-token"
//                    });
//                }
//            }

//            return Unauthorized(new { message = "Invalid username or password." });
//        }
//    }
//}

//---------------------------------------------------------------------------------------------------------------------
using Microsoft.AspNetCore.Mvc;
using Gym_Backend.Models;
using Gym_Backend.Data;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;

namespace Gym_Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (_context.Users.Any(u => u.Username == model.Username) ||
                _context.Admins.Any(a => a.Username == model.Username) ||
                _context.Trainers.Any(t => t.Username == model.Username))
            {
                return BadRequest(new { message = "Username already exists." });
            }

            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Username = model.Username,
                Password = "", // will be set below
                Age = model.Age,
                //Plan = model.Plan,
                Type = "Member" // default
            };
            user.Password = hasher.HashPassword(user, model.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
                return BadRequest(new { message = "Username and password are required." });

            var hasher = new PasswordHasher<User>();

            // 1. Check in Users table
            var user = _context.Users.FirstOrDefault(u => u.Username == model.Username);
            if (user != null)
            {
                var result = hasher.VerifyHashedPassword(user, user.Password, model.Password);
                if (result == PasswordVerificationResult.Success)
                {
                    var isSubscribed = _context.Subscriptions.Any(s => s.Username == model.Username);

                    if (isSubscribed)
                    {
                        return Ok(new
                        {
                            message = "Login successful!",
                            username = user.Username,
                            type = "Member",
                            status = "subscribed",
                            token = "dummy-token"
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            message = "Login successful!",
                            username = user.Username,
                            type = "Member",
                            token = "dummy-token"
                        });
                    }
                }
            }

            // 2. Check in Admins table
            var admin = _context.Admins.FirstOrDefault(a => a.Username == model.Username);
            if (admin != null)
            {
                if (admin.Password == model.Password)
                {
                    return Ok(new
                    {
                        message = "Login successful!",
                        username = admin.Username,
                        type = "Admin",
                        token = "dummy-token"
                    });
                }
            }

            // 3. Check in Trainers table
            var trainer = _context.Trainers.FirstOrDefault(t => t.Username == model.Username);
            if (trainer != null)
            {
                if (trainer.Password == model.Password)
                {
                    return Ok(new
                    {
                        message = "Login successful!",
                        username = trainer.Username,
                        type = "Trainer",
                        token = "dummy-token"
                    });
                }
            }

            // 4. If no user matched
            return Unauthorized(new { message = "Invalid username or password." });
        }
    }
}

