using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class TrainingPlan
{
    public int PlanId { get; set; }

    public int? MemberId { get; set; }

    public int? TrainerId { get; set; }

    public string PlanName { get; set; } = null!;

    public int Duration { get; set; }

    public string Level { get; set; } = null!;

    public string? Details { get; set; }

    public virtual Member? Member { get; set; }

    public virtual Trainer? Trainer { get; set; }
}
