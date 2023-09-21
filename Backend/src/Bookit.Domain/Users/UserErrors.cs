using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Users;

public static class UserErrors
{
    public static Error NotFound =
        new("User.Found", "The user with the specified ID was not found");

    public static Error InvalidCredentials =
        new("User.InvalidCredentials", "The provided credentials were invalid");
}
