using System.Data;
using Bookit.Application.Abstractions.Clock;
using Bookit.Application.Abstractions.Data;
using Bookit.Domain.Abstractions;
using Dapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Quartz;

namespace Bookit.Infrastructure.Outbox;

//only one background job at the same time to prevent concurrency issues
[DisallowConcurrentExecution]
internal sealed class ProcessOutboxMessagesJob : IJob
{
    private static readonly JsonSerializerSettings jsonSerializerSettings =
        new() { TypeNameHandling = TypeNameHandling.All };
    private readonly ISqlConnectionFactory _sqlConnectionFactory;
    private readonly IPublisher _publisher;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly OutboxOptions _outboxOptions;
    private readonly ILogger<ProcessOutboxMessagesJob> _logger;

    public ProcessOutboxMessagesJob(
        ISqlConnectionFactory sqlConnectionFactory,
        IPublisher publisher,
        IDateTimeProvider dateTimeProvider,
        IOptions<OutboxOptions> outboxOptions,
        ILogger<ProcessOutboxMessagesJob> logger
    )
    {
        _sqlConnectionFactory = sqlConnectionFactory;
        _publisher = publisher;
        _dateTimeProvider = dateTimeProvider;
        _outboxOptions = outboxOptions.Value;
        _logger = logger;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation("Processing outbox messages");

        using var sqlConnection = _sqlConnectionFactory.CreateConnection();
        using var transaction = sqlConnection.BeginTransaction();

        var outboxMessages = await GetOutboxMessagesAsync(sqlConnection, transaction: transaction);

        foreach (var outboxMessage in outboxMessages)
        {
            Exception? exception = null;

            try
            {
                var domainEvent = JsonConvert.DeserializeObject<IDomainEvent>(
                    outboxMessage.Content,
                    jsonSerializerSettings
                )!;

                await _publisher.Publish(domainEvent, context.CancellationToken);
            }
            catch (Exception caughtException)
            {
                _logger.LogError(
                    caughtException,
                    "Error while processing outbox message {OutboxMessageId}",
                    outboxMessage.Id
                );

                exception = caughtException;
            }

            await UpdateOutboxMessageAsync(sqlConnection, transaction, outboxMessage, exception);
        }

        transaction.Commit();
        _logger.LogInformation("Finished processing outbox messages");
    }

    private async Task<IReadOnlyList<OutboxMessageResponse>> GetOutboxMessagesAsync(
        IDbConnection connection,
        IDbTransaction transaction
    )
    {
        var sql = $"""
            SELECT
                id,
                content
            FROM outbox_messages
            WHERE processed_on_utc IS NULL
            ORDER BY occurred_on_utc ASC
            LIMIT {_outboxOptions.BatchSize}
            FOR UPDATE
        """;

        var outboMessages = await connection.QueryAsync<OutboxMessageResponse>(
            sql,
            transaction: transaction
        );
        return outboMessages.ToList();
    }

    private async Task UpdateOutboxMessageAsync(
        IDbConnection connection,
        IDbTransaction transaction,
        OutboxMessageResponse outboxMessage,
        Exception? exception
    )
    {
        const string sql =
            @"
            UPDATE outbox_messages
            SET
                processed_on_utc = @processedOnUtc,
                error = @Error
            WHERE id = @Id";

        await connection.ExecuteAsync(
            sql,
            new
            {
                outboxMessage.Id,
                processedOnUtc = _dateTimeProvider.UtcNow,
                error = exception?.ToString()
            },
            transaction: transaction
        );
    }

    internal sealed record OutboxMessageResponse(Guid Id, string Content);
}
