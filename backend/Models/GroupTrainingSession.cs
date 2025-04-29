namespace Gym_Backend.Models
{
    public class GroupTrainingSession
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string TrainerName { get; set; }
    }
}