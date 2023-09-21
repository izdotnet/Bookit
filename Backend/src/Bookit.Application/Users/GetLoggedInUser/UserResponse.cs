namespace Bookit.Application.Users.GetLoggedInUser;

public sealed class UserResponse
{
    public Guid Id { get; init; }

    public string Email { get; init; }

    public string Name { get; init; }

    public bool IsAdmin { get; init; }
}
