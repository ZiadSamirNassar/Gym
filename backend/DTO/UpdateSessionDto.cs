namespace Gym_project.DTO
{
    public class UpdateSessionDto
    {
        public string Type { get; set; } = null!;
        public DateOnly? Date { get; set; }
        public int Duration { get; set; }
     //   public int? MemberId { get; set; }
    }
}
