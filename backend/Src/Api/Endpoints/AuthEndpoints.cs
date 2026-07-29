using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Auth;
using backend.Src.Infrastructure.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth")
            .WithTags("Auth");

        group.MapPost("/register", Register);

        group.MapPost("/login", Login);

        group.MapGet("/", GetAll);

        group.MapGet("/me", GetMe)
            .RequireAuthorization();
        
        group.MapPost("/logout", Logout)
            .RequireAuthorization();
    }

    public static async Task<IResult> Register(
        [FromBody] RegisterRequestDto dto,
        [FromServices] UserManager<AppUser> userManager
    )
    {
        AppUser user = new()
        {
            UserName = dto.Email,
            Email = dto.Email
        };

        var result = await userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
            return Results.BadRequest(result.Errors);
        
        return Results.NoContent();
    }

    public static async Task<IResult> Login(
        [FromBody] LoginRequestDto dto,
        [FromServices] SignInManager<AppUser> signInManager
    )
    {
        var result = await signInManager.PasswordSignInAsync(dto.Email, dto.Password, true, false);

        if (!result.Succeeded)
            return Results.Forbid();
        
        return Results.NoContent();
    }

    public static async Task<IResult> GetAll(
        [FromServices] UserManager<AppUser> userManager
    )
    {
        var users = await userManager.Users.ToListAsync();
        
        return Results.Ok(users);
    }

    public static async Task<IResult> GetMe(
        [FromServices] UserManager<AppUser> userManager,
        [FromServices] IHttpContextAccessor accessor
    )
    {
        var userId = accessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (userId is null)
            return Results.Unauthorized();

        var user = await userManager.FindByIdAsync(userId);
        
        return Results.Ok(user);
    }

    public static async Task<IResult> Logout(
        [FromServices] SignInManager<AppUser> signInManager
    )
    {
        await signInManager.SignOutAsync();
        
        return Results.NoContent();
    }
}
