namespace Gym_Backend.Models
{
    public class RegisterModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = ""; // Hashed
        public int Age { get; set; }
        public string Plan { get; set; } = "";
        public string Type { get; set; } = "Member"; // Default user type is "Member"
    }
}