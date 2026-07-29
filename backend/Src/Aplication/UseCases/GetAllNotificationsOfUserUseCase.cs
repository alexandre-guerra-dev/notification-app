using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.Mappers;
using backend.Src.Infrastructure.Repositories;

namespace backend.Src.Aplication.UseCases;

public class GetAllNotificationsOfUserUseCase(NotificationsRepository notificationsRepository)
{
    private readonly NotificationsRepository _notificationsRepository = notificationsRepository;
    
    public async Task<IEnumerable<NotificationResponseDto>> InvokeAsync(Guid userId)
    {
        var notifications = _notificationsRepository.GetAllOfUserAsync(userId);

        return notifications.Select(n => n.ToDto());
    }
}
