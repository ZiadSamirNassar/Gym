using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int MemberId { get; set; }

    public int SessionId { get; set; }

    public virtual Member Member { get; set; } = null!;

    public virtual Session Session { get; set; } = null!;
}
