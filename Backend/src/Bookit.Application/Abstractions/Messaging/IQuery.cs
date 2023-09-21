using Bookit.Domain.Abstractions;
using MediatR;

namespace Bookit.Application.Abstractions.Messaging
{
    public interface IQuery<TResponse> : IRequest<Result<TResponse>> { }
}
