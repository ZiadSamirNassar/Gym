using Microsoft.Extensions.Primitives;

namespace Gym_project.DTO
{
    public class SessionDto
    {   
        public int SessionId { get; set; }
        public int? TrainerId { get; set; }
        public string Type { get; set; }
        public DateOnly? Date { get; set; }
        public int Duration { get; set; }
        public string Name { get; set; }
        public int? Time { get; set; }
        //  public int? MemberId { get; set; }
    }


}
