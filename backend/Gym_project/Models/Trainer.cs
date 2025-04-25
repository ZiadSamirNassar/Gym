using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class Trainer
{
    public int TrainerId { get; set; }

    public string Name { get; set; } = null!;

    public int Age { get; set; }

    public int? TrainingPlanId { get; set; }

    public virtual ICollection<ProgressReport> ProgressReports { get; set; } = new List<ProgressReport>();

    public virtual ICollection<Session> Sessions { get; set; } = new List<Session>();

    public virtual User TrainerNavigation { get; set; } = null!;

    public virtual TrainingPlan? TrainingPlan { get; set; }

    public virtual ICollection<TrainingPlan> TrainingPlans { get; set; } = new List<TrainingPlan>();
}
