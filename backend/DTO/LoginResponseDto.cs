namespace Gym_project.DTOs
{
    public class LoginResponseDto
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public string? MembershipPlanName { get; set; } // Nullable to accommodate non-member roles
        public int? PersonalSessions { get; set; } // Nullable to accommodate non-member roles
    }
}