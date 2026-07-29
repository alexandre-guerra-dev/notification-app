using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Infrastructure.Database;

namespace backend.Src.Domain.Entities;

public class Notification
{
    public Guid Id { get; private set; }
    public string Content { get; private set; }
    public bool Viewed { get; private set; }

    public Guid SenderId { get; private set; }
    public AppUser? Sender { get; private set; }

    public Guid ReceiverId { get; private set; }
    public AppUser? Receiver { get; private set; }

    public Notification(string content, Guid senderId, Guid receiverId)
    {
        Id = new();
        Content = content;
        Viewed = false;

        SenderId = senderId;
        ReceiverId = receiverId;
    }

    public void View()
    {
        Viewed = true;
    }
}
