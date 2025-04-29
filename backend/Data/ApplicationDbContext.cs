using Microsoft.EntityFrameworkCore;
using Gym_Backend.Models;

namespace Gym_Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

       // public DbSet<RegisterModel> Users { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<GroupTrainingSession> GroupTrainingSessions { get; set; }
        public DbSet<JoinedSession> JoinedSessions { get; set; }
        public DbSet<PersonalTrainingSession> PersonalTrainingSessions { get; set; }

    }
}
