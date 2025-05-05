using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class Session
{
    public int SessionId { get; set; }

    public int? TrainerId { get; set; }

    public string Type { get; set; } = null!;

    public DateOnly? Date { get; set; }

    public int Duration { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Trainer? Trainer { get; set; }
}
