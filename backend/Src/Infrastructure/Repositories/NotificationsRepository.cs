using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Domain.Entities;
using backend.Src.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Infrastructure.Repositories;

public class NotificationsRepository (AppDbContext dbContext)
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Notification?> GetNotificationAsync(Guid notificationId)
    {
        return await _dbContext.Notifications
            .FirstOrDefaultAsync(n => n.Id == notificationId);
    }
    
    public IEnumerable<Notification>? GetNotifications(IEnumerable<Guid> notificationsId)
    {
        var notifications = _dbContext.Notifications
            .Where(n => notificationsId.Any(id => id == n.Id));

        if (notifications.Count() != notificationsId.Count())
            return null;
        
        return notifications;
    }

    public IEnumerable<Notification> GetAllOfUserAsync(Guid userId)
    {
        return _dbContext.Notifications
            .Where(n => n.ReceiverId == userId)
            .AsNoTracking();
    }

    public async Task<Notification> SaveNewAsync(Notification notification)
    {
        await _dbContext.Notifications.AddAsync(notification);
        await SaveAsync();
        return notification;
    }

    public async Task SaveAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Notification> Delete(Notification notification)
    {
        _dbContext.Notifications.Remove(notification);
        await SaveAsync();
        return notification;
    }
    
    public async Task<IEnumerable<Notification>> Delete(IEnumerable<Notification> notifications)
    {
        _dbContext.Notifications.RemoveRange(notifications);
        await SaveAsync();
        return notifications;
    }
}
