using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Reviews.Events;

public sealed record ReviewCreatedDomainEvent(ReviewId ReviewId) : IDomainEvent;
