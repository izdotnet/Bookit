using System;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bookit.Application.Abstractions.Behaviors
{
    public class LoggingBehavior<TRequest, TResposne> : IPipelineBehavior<TRequest, TResposne>
        where TRequest : IBaseCommand
    {
        private readonly ILogger<TRequest> _logger;

        public LoggingBehavior(ILogger<TRequest> logger)
        {
            _logger = logger;
        }

        public async Task<TResposne> Handle(
            TRequest request,
            RequestHandlerDelegate<TResposne> next,
            CancellationToken cancellationToken
        )
        {
            //using reflection to get the request type
            var name = request.GetType().Name;

            try
            {
                _logger.LogInformation("Executing command {Command}", name);
                var result = await next();
                _logger.LogInformation("Command {Command} processed successfully", name);
                return result;
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Command {Command} processing failed", name);
                throw;
            }
        }
    }
}
