namespace Gym_project.DTO
{
    public class CreateProgressReportDto
    {

        public int MemberId { get; set; }
        public DateOnly Date { get; set; }
        public decimal Weight { get; set; }
        public decimal? BodyFatPercentage { get; set; }
        public string? PerformanceNotes { get; set; }
    }
}
