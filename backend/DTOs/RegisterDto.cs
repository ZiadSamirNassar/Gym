//namespace Gym_Backend.DTOs
//{
//    public class RegisterDto
//    {
//        public string FirstName { get; set; } = "";
//        public string LastName { get; set; } = "";
//        public string Email { get; set; } = "";
//        public string Username { get; set; } = "";
//        public string Password { get; set; } = "";
//        public int Age { get; set; }
//        public string Plan { get; set; } = "";
//    }
//}
namespace Gym_Backend.DTOs
{
    public class RegisterDto
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = ""; // This will be hashed
        public int Age { get; set; }
        public string Plan { get; set; } = "";
        public string Type { get; set; } = "Member"; // Default to "Member"
    }
}
