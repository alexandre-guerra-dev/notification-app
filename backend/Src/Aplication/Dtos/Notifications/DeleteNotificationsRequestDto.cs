using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Src.Aplication.Dtos.Notifications;

public record DeleteNotificationsRequestDto(
    IEnumerable<Guid> NotificationsId
);
