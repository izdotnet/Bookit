using Bookit.Domain.Abstractions;
using Bookit.Domain.Events;

namespace Bookit.Domain.Users;

public sealed class User : Entity<UserId>
{
    private User(UserId id, Email email, FirstName firstName, LastName lastName, bool isAdmin)
        : base(id)
    {
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        IsAdmin = isAdmin;
    }

    private User() { }

    public FirstName FirstName { get; private set; }
    public LastName LastName { get; private set; }
    public Email Email { get; private set; }
    public bool IsAdmin { get; private set; } = false;
    public string IdentityId { get; private set; } = string.Empty;

    public static User Create(
        Email email,
        FirstName firstName,
        LastName lastName,
        bool isAdmin = false
    )
    {
        var user = new User(UserId.New(), email, firstName, lastName, isAdmin);
        user.RaiseDomainEvent(new UserCreatedDomainEvent(user.Id));
        return user;
    }

    public void SetIdentityId(string identityId)
    {
        IdentityId = identityId;
    }
}
