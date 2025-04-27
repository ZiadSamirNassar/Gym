using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class ProgressReport
{
    public int ReportId { get; set; }

    public int? MemberId { get; set; }

    public int? TrainerId { get; set; }

    public DateOnly Date { get; set; }

    public decimal Weight { get; set; }

    public decimal? BodyFatPercentage { get; set; }

    public string? PerformanceNotes { get; set; }

    public virtual Member? Member { get; set; }

    public virtual Trainer? Trainer { get; set; }
}
