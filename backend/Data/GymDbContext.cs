using System;
using System.Collections.Generic;
using Gym_project.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_project.Data;

public partial class GymDbContext : DbContext
{
    public GymDbContext()
    {
    }

    public GymDbContext(DbContextOptions<GymDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<MembershipPlan> MembershipPlans { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<ProgressReport> ProgressReports { get; set; }

    public virtual DbSet<Session> Sessions { get; set; }

    public virtual DbSet<Trainer> Trainers { get; set; }

    public virtual DbSet<TrainingPlan> TrainingPlans { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=OMAR\\SQLEXPRESS;Database=gym_db;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admin__43AA41419FE03B3E");

            entity.ToTable("Admin");

            entity.Property(e => e.AdminId)
                .ValueGeneratedNever()
                .HasColumnName("admin_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");

            entity.HasOne(d => d.AdminNavigation).WithOne(p => p.Admin)
                .HasForeignKey<Admin>(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Admin__admin_id__4CA06362");
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Booking__5DE3A5B16E74C9E0");

            entity.ToTable("Booking");

            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.MemberId).HasColumnName("member_id");
            entity.Property(e => e.SessionId).HasColumnName("session_id");

            entity.HasOne(d => d.Member).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK_Booking_Member");

            entity.HasOne(d => d.Session).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.SessionId)
                .HasConstraintName("FK_Booking_Session");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.MemberId).HasName("PK__Member__B29B8534EDAD1653");

            entity.ToTable("Member");

            entity.Property(e => e.MemberId)
                .ValueGeneratedNever()
                .HasColumnName("member_id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.MembershipPlanId).HasColumnName("membership_plan_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");

            entity.HasOne(d => d.MemberNavigation).WithOne(p => p.Member)
                .HasForeignKey<Member>(d => d.MemberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Member__member_i__5535A963");

            entity.HasOne(d => d.MembershipPlan).WithMany(p => p.Members)
                .HasForeignKey(d => d.MembershipPlanId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Member__membersh__5629CD9C");
        });

        modelBuilder.Entity<MembershipPlan>(entity =>
        {
            entity.HasKey(e => e.PlanId).HasName("PK__Membersh__BE9F8F1DFC59EC70");

            entity.ToTable("Membership_Plan");

            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.Benefits)
                .HasColumnType("text")
                .HasColumnName("benefits");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.PersonalSessions).HasColumnName("personal_sessions");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PK__Message__0BBF6EE6EB879380");

            entity.ToTable("Message");

            entity.Property(e => e.MessageId).HasColumnName("message_id");
            entity.Property(e => e.Message1)
                .HasColumnType("text")
                .HasColumnName("message");
            entity.Property(e => e.ReceiverId).HasColumnName("receiver_id");
            entity.Property(e => e.SenderId).HasColumnName("sender_id");

            entity.HasOne(d => d.Receiver).WithMany(p => p.MessageReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__receive__7F2BE32F");

            entity.HasOne(d => d.Sender).WithMany(p => p.MessageSenders)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__sender___7E37BEF6");
        });

        modelBuilder.Entity<ProgressReport>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Progress__779B7C5850C14C1E");

            entity.ToTable("Progress_Report");

            entity.Property(e => e.ReportId).HasColumnName("report_id");
            entity.Property(e => e.BodyFatPercentage)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("body_fat_percentage");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.MemberId).HasColumnName("member_id");
            entity.Property(e => e.PerformanceNotes)
                .HasColumnType("text")
                .HasColumnName("performance_notes");
            entity.Property(e => e.TrainerId).HasColumnName("trainer_id");
            entity.Property(e => e.Weight)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("weight");

            entity.HasOne(d => d.Member).WithMany(p => p.ProgressReports)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Progress___membe__7A672E12");

            entity.HasOne(d => d.Trainer).WithMany(p => p.ProgressReports)
                .HasForeignKey(d => d.TrainerId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Progress___train__7B5B524B");
        });

        modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(e => e.SessionId).HasName("PK__Session__69B13FDC4677E320");

            entity.ToTable("Session");

            entity.Property(e => e.SessionId).HasColumnName("session_id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.TrainerId).HasColumnName("trainer_id");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("type");

            entity.HasOne(d => d.Trainer).WithMany(p => p.Sessions)
                .HasForeignKey(d => d.TrainerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Session__trainer__71D1E811");
        });

        modelBuilder.Entity<Trainer>(entity =>
        {
            entity.HasKey(e => e.TrainerId).HasName("PK__Trainer__65A4B629B03D9915");

            entity.ToTable("Trainer");

            entity.Property(e => e.TrainerId)
                .ValueGeneratedNever()
                .HasColumnName("trainer_id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");

            entity.HasOne(d => d.TrainerNavigation).WithOne(p => p.Trainer)
                .HasForeignKey<Trainer>(d => d.TrainerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Trainer__trainer__4F7CD00D");
        });

        modelBuilder.Entity<TrainingPlan>(entity =>
        {
            entity.HasKey(e => e.PlanId).HasName("PK__Training__BE9F8F1DD2A5E560");

            entity.ToTable("Training_Plan");

            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.ExerciseName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("exercise_name");
            entity.Property(e => e.Level)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("level");
            entity.Property(e => e.MemberId).HasColumnName("member_id");
            entity.Property(e => e.TrainerId).HasColumnName("trainer_id");

            entity.HasOne(d => d.Member).WithMany(p => p.TrainingPlans)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Training___membe__6A30C649");

            entity.HasOne(d => d.Trainer).WithMany(p => p.TrainingPlans)
                .HasForeignKey(d => d.TrainerId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Training___train__6B24EA82");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3213E83FD72D1052");

            entity.ToTable("User");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Type)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
