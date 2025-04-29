namespace Gym_Backend.Models
{
    public class PersonalTrainingSession
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public int DurationMinutes { get; set; }
        public string TrainerName { get; set; }
    }
}
