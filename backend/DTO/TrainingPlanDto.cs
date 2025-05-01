namespace Gym_project.DTO
{
    public class TrainingPlanDto
    {
        public int PlanId { get; set; }
        public int? MemberId { get; set; }
        public int? TrainerId { get; set; }
        public string ExerciseName { get; set; }
        public int Duration { get; set; }
        public string Level { get; set; }
    }

    public class CreateTrainingPlanDto
    {
        public int? MemberId { get; set; }
        public string ExerciseName { get; set; }
        public int Duration { get; set; }
        public string Level { get; set; }
    }
}
