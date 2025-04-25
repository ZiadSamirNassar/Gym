using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class Admin
{
    public int AdminId { get; set; }

    public string Name { get; set; } = null!;

    public virtual User AdminNavigation { get; set; } = null!;
}
