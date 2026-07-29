using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Infrastructure.Database;

public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public DbSet<Notification> Notifications { get; private set; }
    public AppDbContext(DbContextOptions options) : base(options) {}
}
