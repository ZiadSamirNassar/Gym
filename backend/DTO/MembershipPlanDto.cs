namespace Gym_project.DTOs;

public class MembershipPlanDto
{
    public int PlanId { get; set; }
    public string Name { get; set; }
    public int Duration { get; set; }
    public decimal Price { get; set; }
    public string Benefits { get; set; }
    public int PersonalSessions { get; set; }
}

public class CreateMembershipPlanDto
{
    public string Name { get; set; }
    public int Duration { get; set; }
    public decimal Price { get; set; }
    public string Benefits { get; set; }
    public int PersonalSessions { get; set; }
}

public class UpdateMembershipPlanDto
{
    public string Name { get; set; }
    public int Duration { get; set; }
    public decimal Price { get; set; }
    public string Benefits { get; set; }
    public int PersonalSessions { get; set; }
}