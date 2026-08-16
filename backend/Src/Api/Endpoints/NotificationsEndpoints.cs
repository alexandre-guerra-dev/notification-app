using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.EventBuses;
using backend.Src.Aplication.UseCases;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Src.Api.Endpoints;

public static class NotificationsEndpoints
{
    public static void MapNotificationsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/notifications")
            .WithTags("Notifications")
            .RequireAuthorization();

        group.MapGet("/my", GetAllMy);

        group.MapGet("/my/sync", Sync);

        group.MapPost("/send/{receiverId:guid}", Send);

        group.MapPut("/view/bulk", View);

        group.MapDelete("/{notificationId:guid}", Delete);
    }

    public static async Task<IResult> GetAllMy(
        [FromServices] IHttpContextAccessor accessor,
        [FromServices] GetAllNotificationsOfUserUseCase useCase
    )
    {
        if (
            Guid.TryParse(accessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier),
            out var userId)
        )
        {
            var notifications = await useCase.InvokeAsync(userId);
            return Results.Ok(notifications);
        }

        return Results.Unauthorized();
    }

    public static async Task<IResult> Sync(
        HttpContext context,
        [FromServices] GetNotificationUseCase useCase,
        [FromServices] NotificationSendedEventBus eventBus
    )
    {
        var ct = context.RequestAborted;

        if (!Guid.TryParse(
                context.User.FindFirstValue(ClaimTypes.NameIdentifier),
                out var userId
        ))
            return Results.Unauthorized();

        var connection = eventBus.GetConnection();

        context.Response.ContentType = "text/event-stream";

        var serializerOptions = new JsonSerializerOptions(JsonSerializerDefaults.Web);

        try
        {
            await foreach (var @event in connection.Reader.ReadAllAsync(ct))
            {
                if (@event.ReceiverId != userId)
                    continue;

                var notification = await useCase.Execute(@event.NotificationId);
                
                var response =
                "event: NotificationReceived\n" +
                $"data: {JsonSerializer.Serialize(notification, serializerOptions)}\n" +
                "\n";

                await context.Response.WriteAsync(response, ct);
                await context.Response.Body.FlushAsync(ct);
            }
        }
        finally
        {
            eventBus.ReleaseConnection(connection);
        }

        return Results.Empty;
    }

    public static async Task<IResult> Send(
        [FromRoute] Guid receiverId,
        [FromBody] SendNotificationRequestDto dto,
        [FromServices] IHttpContextAccessor accessor,
        [FromServices] SendNotificationUseCase useCase
    )
    {
        if (
            Guid.TryParse(accessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier),
            out var userId)
        )
        {
            var notification = await useCase.InvokeAsync(dto, receiverId, userId);
            return Results.Ok(notification);
        }

        return Results.Unauthorized();
    }

    public static async Task<IResult> View(
        [FromBody] ViewNotificationsRequestDto requestDto,
        [FromServices] ViewNotificationsUseCase useCase
    )
    {
        var notifications = await useCase.Execute(requestDto);

        if (notifications is null)
            return Results.NotFound("Some notification(s) not found.");
        
        return Results.Ok(notifications);
    }

    public static async Task<IResult> Delete(
        [FromRoute] Guid notificationId,
        [FromServices] DeleteNotificationUseCase useCase
    )
    {
        var notification = await useCase.Execute(notificationId);

        if (notification is null)
            return Results.NotFound($"Notification {notificationId} not found.");
        
        return Results.NoContent();
    }
}
