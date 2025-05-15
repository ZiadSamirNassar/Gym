namespace Gym_project.DTO
{
    public class MessageDto
    {
        public int? MessageId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string Content { get; set; }
        public DateTime? Timestamp { get; set; }
    }
}
