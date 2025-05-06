namespace Gym_project.DTO
{
    public class CreateSessionDto
    {
        public int? TrainerId { get; set; }
        public string Type { get; set; } = null!;
        public DateOnly? Date { get; set; }
        public int Duration { get; set; }
       // public int? MemberId { get; set; }  // To split between group (null) and personal sessions
    }
}
