using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Users.GetLoggedInUser;

public sealed record GetLoggedInUserQuery : IQuery<UserResponse>;
