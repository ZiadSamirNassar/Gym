namespace Gym_Backend.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string MembershipName { get; set; }
        public string Duration { get; set; }
        public decimal Price { get; set; }
        public DateTime SubscriptionDate { get; set; }
        public bool IsPaymentOk { get; set; }


    }
}
