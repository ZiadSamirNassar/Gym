public class ProgressReportDto
{
    public int ReportId { get; set; }
    public int? MemberId { get; set; }
    public int? TrainerId { get; set; }
    public string? TrainerName { get; set; }
    
    public string? MemberName { get; set; }
    public DateOnly Date { get; set; }
    public decimal Weight { get; set; }
    public decimal? BodyFatPercentage { get; set; }
    public string? PerformanceNotes { get; set; }
}