using Bookit.Domain.Abstractions;
using MediatR;

namespace Bookit.Application.Abstractions.Messaging
{
    public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
        where TQuery : IQuery<TResponse> { }
}
