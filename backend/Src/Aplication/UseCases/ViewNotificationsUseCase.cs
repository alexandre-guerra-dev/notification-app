using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.Mappers;
using backend.Src.Infrastructure.Repositories;

namespace backend.Src.Aplication.UseCases;

public class ViewNotificationsUseCase(NotificationsRepository notificationsRepository)
{
    private readonly NotificationsRepository _notificationsRepository = notificationsRepository;

    public async Task<IEnumerable<NotificationResponseDto>?> Execute(ViewNotificationsRequestDto dto)
    {
        var notifications = _notificationsRepository.GetNotifications(dto.NotificationsId);

        if (notifications is null)
            return null;

        foreach (var notification in notifications)
        {
            notification.View();
        }

        await _notificationsRepository.SaveAsync();

        return notifications.Select(n => n.ToDto());
    }
}
