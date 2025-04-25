using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class MembershipPlan
{
    public int PlanId { get; set; }

    public string Name { get; set; } = null!;

    public int Duration { get; set; }

    public decimal Price { get; set; }

    public string Benefits { get; set; } = null!;

    public int PersonalSessions { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}
