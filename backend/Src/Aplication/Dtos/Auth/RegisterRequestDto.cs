using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Src.Aplication.Dtos.Auth;

public record RegisterRequestDto(
    string Email,
    string Password
);
