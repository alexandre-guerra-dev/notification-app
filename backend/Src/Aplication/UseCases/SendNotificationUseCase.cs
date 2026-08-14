using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.EventBuses;
using backend.Src.Aplication.Mappers;
using backend.Src.Infrastructure.Repositories;

namespace backend.Src.Aplication.UseCases;

public class SendNotificationUseCase(
    NotificationsRepository notificationsRepository,
    NotificationSendedEventBus eventBus
)
{
    private readonly NotificationsRepository _notificationsRepository = notificationsRepository;
    private readonly NotificationSendedEventBus _eventBus = eventBus;
    
    public async Task<NotificationResponseDto> InvokeAsync(
        SendNotificationRequestDto dto,
        Guid receiverId,
        Guid senderId)
    {
        var notification = await _notificationsRepository.SaveNewAsync(dto.ToEntity(receiverId, senderId));

        await _eventBus.Publish(new (
            notification.Id,
            notification.SenderId,
            notification.ReceiverId
        ));

        return notification.ToDto();
    }
}
