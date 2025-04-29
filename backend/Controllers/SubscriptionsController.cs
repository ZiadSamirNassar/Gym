using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gym_Backend.Data;
using Gym_Backend.Models;
using Gym_Backend.DTOs;
namespace Gym_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/subscriptions/subscribe
        //[HttpPost("subscribe")]
        //public async Task<IActionResult> Subscribe([FromBody] SubscriptionRequest request)
        //{
        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        //    if (user == null)
        //    {
        //        return NotFound(new { message = "User not found." });
        //    }

        //    var membership = await _context.Memberships.FindAsync(request.MembershipId);
        //    if (membership == null)
        //    {
        //        return NotFound(new { message = "Membership plan not found." });
        //    }

        //    var subscription = new Subscription
        //    {
        //        Username = request.Username,
        //        MembershipName = membership.Name,
        //        Duration = membership.Duration,
        //        Price = membership.Price,
        //        SubscriptionDate = DateTime.UtcNow
        //    };

        //    _context.Subscriptions.Add(subscription);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Subscription successful!" });
        //}
        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] SubscriptionRequest request)
        {
            // Check if user exists
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Check if membership exists
            var membership = await _context.Memberships.FindAsync(request.MembershipId);
            if (membership == null)
            {
                return NotFound(new { message = "Membership plan not found." });
            }

            // Check if the user is already subscribed to this membership
            var existingSubscription = await _context.Subscriptions
                .FirstOrDefaultAsync(s => s.Username == request.Username && s.MembershipName == membership.Name);

            if (existingSubscription != null)
            {
                return Conflict(new { message = "You are already subscribed to this membership." });
            }

            // Create new subscription
            var subscription = new Subscription
            {
                Username = request.Username,
                MembershipName = membership.Name,
                Duration = membership.Duration,
                Price = membership.Price,
                SubscriptionDate = DateTime.UtcNow
            };

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subscription successful!" });
        }



        // GET: api/subscriptions/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetAllSubscriptions()
        {
            var subscriptions = await _context.Subscriptions.ToListAsync();
            return Ok(subscriptions);
        }
        //DELETE: api/subscriptions/delete/{id}
                [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound(new { message = "Subscription not found." });
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subscription deleted successfully!" });
        }
        // PATCH: Update payment status
        [HttpPatch("update-payment-status/{id}")]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] UpdatePaymentStatusDto dto)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
                return NotFound();

            subscription.IsPaymentOk = dto.IsPaymentOk;
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }

    // DTO (Data Transfer Object) for subscribing
    public class SubscriptionRequest
    {
        public string Username { get; set; }
        public int MembershipId { get; set; }
    }
}




