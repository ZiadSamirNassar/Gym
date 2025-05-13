using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Gym_project.Data;
using Gym_project.Models;
using Gym_project.DTOs;
using Gym_project.DTO;
using Microsoft.AspNetCore.Authorization;


namespace Gym_project.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly GymDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(GymDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDto loginDto)
        {
            // Find user
            var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);

            if (user == null || user.Password != loginDto.Password) // Replace with hash check in real life!
                return Unauthorized("Invalid username or password");

            var token = GenerateJwt(user);

            return Ok(new { data = new LoginResponseDto
            {
                Username = user.Username,
                Role = user.Type,
                Token = token
            } });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterMemberRequestDto dto)
        {
            // Check if username is taken
            if (_context.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            // Optionally: Validate MembershipPlanId exists
            var plan = await _context.MembershipPlans.FindAsync(dto.MembershipPlanId);
            if (plan == null)
                return BadRequest("Invalid MembershipPlanId");

            // Create User
            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password,  // TODO: Hash password 
                Type = "member"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create Member
            var member = new Member
            {
                Name = dto.Name,
                Age = dto.Age,
                MembershipPlanId = dto.MembershipPlanId,
                MemberNavigation = user
            };
            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            var response = new RegisterMemberResponseDto
            {
                MemberId = member.MemberId,
                Username = user.Username,
                Role = user.Type,
                Name = member.Name
            };

            return Ok(new { data = response });
        }


        // Register Admin [Admins only]
        [HttpPost("register/admin")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterAdminRequestDto dto)
        {
            // Check for unique username
            if (_context.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            // Create User
            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password, // TODO : Hash 
                Type = "admin"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create Admin
            var admin = new Admin
            {
                // check this ( if i delete the next line it still works successfully ) already delete it into another users (trainer , member)
                AdminId = user.Id,
                Name = dto.Name,
                AdminNavigation = user
            };
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();

            return Ok(new { data = new { admin.AdminId, dto.Username, Role = "admin" } });
        }

        //  Register Trainer [Admins only]
        [HttpPost("register/trainer")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> RegisterTrainer([FromBody] RegisterTrainerRequestDto dto)
        {
            if (_context.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            // user table
            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password, // TODO Hash in 
                Type = "trainer"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // trainer table
            var trainer = new Trainer
            {
                Name = dto.Name,
                Age = dto.Age,
                TrainerNavigation = user
            };
            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();

            return Ok(new{ data = new { trainer.TrainerId, dto.Username, Role = "trainer" } });
        }

        private string GenerateJwt(User user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Type)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(12),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}