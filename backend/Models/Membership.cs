namespace Gym_Backend.Models
{
    public class Membership
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public decimal Price { get; set; }
         public string Benefits { get; set; } = string.Empty;
    }
}
