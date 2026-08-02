using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Notifications;
using backend.Src.Aplication.UseCases;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Src.Api.Endpoints;

public static class NotificationsEndpoints
{
    public static void MapNotificationsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/notifications")
            .RequireAuthorization()
            .WithTags("Notifications");

        group.MapGet("/my", GetAllMy);

        group.MapGet("/sync", Sync);

        group.MapPost("/send/{receiverId:guid}", Send);

        //group.MapPatch("/view", View);
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

    public static IResult Sync()
    {
        return Results.Ok();
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

    /*public static IResult View()
    {
        return Results.Ok();
    }*/
}
