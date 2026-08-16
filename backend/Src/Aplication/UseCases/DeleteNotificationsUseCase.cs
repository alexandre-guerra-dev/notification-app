using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.Mappers;
using backend.Src.Infrastructure.Repositories;

namespace backend.Src.Aplication.UseCases;

public class DeleteNotificationUseCase(NotificationsRepository notificationsRepository)
{
    private readonly NotificationsRepository _notificationsRepository = notificationsRepository;

    public async Task<NotificationResponseDto?> Execute(Guid notificationId)
    {
        var notification = await _notificationsRepository.GetNotificationAsync(notificationId);

        if (notification is null)
            return null;
    
        await _notificationsRepository.Delete(notification);

        return notification.ToDto();
    }
}
