using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Users.RegisterUser;

public sealed record RegisterUserCommand(
    string Email,
    string FirstName,
    string LastName,
    string Password
) : ICommand<Guid>;
