namespace Gym_Backend.Models
{
    public class JoinedSession
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Notes { get; set; }
        public string SessionTitle { get; set; }
        public string TrainerName { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
    }

}
