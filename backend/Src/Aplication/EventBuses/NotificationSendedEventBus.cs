using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Channels;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.Mappers;
using backend.Src.Domain.Entities;
using backend.Src.Domain.Events;

namespace backend.Src.Aplication.EventBuses;

public class NotificationSendedEventBus
{
    private readonly List<Channel<NotificationSendedEvent>> Channels = [];

    public Channel<NotificationSendedEvent> GetConnection()
    {
        var channel = Channel.CreateUnbounded<NotificationSendedEvent>();

        Channels.Add(channel);
        
        return channel;
    }

    public void ReleaseConnection(Channel<NotificationSendedEvent> channel)
    {
        Channels.Remove(channel);
    }

    public async Task Publish(NotificationSendedEvent @event, CancellationToken ct = default)
    {
        foreach (var subscriber in Channels)
        {
            await subscriber.Writer.WriteAsync(@event, ct);
        }
    }
}
