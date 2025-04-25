using System;
using System.Collections.Generic;

namespace Gym_project.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Type { get; set; }

    public virtual Admin? Admin { get; set; }

    public virtual Member? Member { get; set; }

    public virtual ICollection<Message> MessageReceivers { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageSenders { get; set; } = new List<Message>();

    public virtual Trainer? Trainer { get; set; }
}
