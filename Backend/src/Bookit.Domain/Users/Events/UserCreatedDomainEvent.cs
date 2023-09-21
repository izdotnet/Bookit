using Bookit.Domain.Abstractions;
using Bookit.Domain.Users;

namespace Bookit.Domain.Events;

public sealed record UserCreatedDomainEvent(UserId UserId) : IDomainEvent { }
