using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Src.Aplication.Dtos.Notifications;

public record NotificationResponseDto(
    Guid Id,
    string Content,
    bool Viewed,
    
    Guid SenderId
);
