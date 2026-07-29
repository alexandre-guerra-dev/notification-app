using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Domain.Entities;

namespace backend.Src.Aplication.Mappers;

public static class NotificationsMapper
{
    public static NotificationResponseDto ToDto(this Notification notification)
    {
        return new(
            notification.Id, 
            notification.Content, 
            notification.Viewed, 
            notification.SenderId
        );
    }

    public static Notification ToEntity(this SendNotificationRequestDto dto, Guid receiverId, Guid senderId)
    {
        return new(
            dto.Content,
            senderId,
            receiverId
        );
    }
}
