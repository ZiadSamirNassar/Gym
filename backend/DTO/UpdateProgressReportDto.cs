namespace Gym_project.DTOs
{
    public class UpdateProgressReportDto
    {
        // Properties that members can update
        public decimal? Weight { get; set; } = null;
        public decimal? BodyFatPercentage { get; set; } = null;
        
        // Properties that trainers can update
        public string? PerformanceNotes { get; set; } = null;
    }
}