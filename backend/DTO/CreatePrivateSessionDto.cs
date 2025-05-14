namespace Gym_project.DTO
{
    public class CreatePrivateSessionDto
    {
        public DateOnly? Date { get; set; }
        public int Duration { get; set; }
        public int Trainer_id { get; set; }

        public int Time { get; set; }
        public string Name { get; set; }
    }
}
