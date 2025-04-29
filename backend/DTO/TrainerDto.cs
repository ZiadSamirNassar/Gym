namespace Gym_project.DTO
{
    // DTOs/TrainerDto.cs
public class TrainerDto
    {
        public int TrainerId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Username { get; set; } // From associated User
    }

    // DTOs/CreateTrainerDto.cs
    public class CreateTrainerDto
    {
        public string Username { get; set; }
        public string Password { get; set; } // Hash in prod!
        public string Name { get; set; }
        public int Age { get; set; }
    }

    // DTOs/UpdateTrainerDto.cs
    public class UpdateTrainerDto
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
}
