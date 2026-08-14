using backend.Src.Api.Endpoints;
using backend.Src.Aplication.EventBuses;
using backend.Src.Aplication.UseCases;
using backend.Src.Infrastructure.Database;
using backend.Src.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Database

var dbPath = builder.Configuration["Database:Path"];

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(dbPath);
});

// Identity

builder.Services.AddIdentity<AppUser, IdentityRole<Guid>>(opt =>
{
    opt.Password.RequireDigit = false;
    opt.Password.RequiredLength = 6;
    opt.Password.RequiredUniqueChars = 0;
    opt.Password.RequireLowercase = false;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequireUppercase = false;

    opt.User.RequireUniqueEmail = false;
})
.AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

// CORS

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("default", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Services

builder.Services // Notifications Use Cases
    .AddScoped<GetNotificationUseCase>()
    .AddScoped<GetAllNotificationsOfUserUseCase>()
    .AddScoped<SendNotificationUseCase>();

builder.Services.AddScoped<NotificationsRepository>();

builder.Services.AddSingleton<NotificationSendedEventBus>();

// Swagger

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

app.UseAuthentication();
app.UseAuthorization();

app.MapNotificationsEndpoints();
app.MapAuthEndpoints();

app.Run();