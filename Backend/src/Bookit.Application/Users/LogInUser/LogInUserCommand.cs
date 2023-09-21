using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Users.LogInUser;

public sealed record LogInUserCommand(string Email, string Password)
    : ICommand<AccessTokenResponse>;
