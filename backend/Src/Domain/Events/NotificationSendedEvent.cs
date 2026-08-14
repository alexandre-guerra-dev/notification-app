using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Src.Domain.Events;

public record NotificationSendedEvent(
    Guid NotificationId,
    Guid SenderId,
    Guid ReceiverId
);
