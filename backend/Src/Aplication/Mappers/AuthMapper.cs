using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.Aplication.Dtos.Auth;
using backend.Src.Infrastructure.Database;

namespace backend.Src.Aplication.Mappers;

public static class AuthMapper
{
    public static AppUserResponseDto ToDto(this AppUser user)
    {
        return new(
            user.Id,
            user.Email!
        );
    }
}
