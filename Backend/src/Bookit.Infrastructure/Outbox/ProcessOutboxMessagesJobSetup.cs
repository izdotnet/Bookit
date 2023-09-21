using Microsoft.Extensions.Options;
using Quartz;

namespace Bookit.Infrastructure.Outbox;

public class ProcessOutboxMessagesJobSetup : IConfigureOptions<QuartzOptions>
{
    private readonly OutboxOptions _outboxOptions;

    public ProcessOutboxMessagesJobSetup(IOptions<OutboxOptions> outboxOptions)
    {
        _outboxOptions = outboxOptions.Value;
    }

    public void Configure(QuartzOptions options)
    {
        const string JobName = nameof(ProcessOutboxMessagesJob);
        //register outbox job with quartz and configure it to run every x seconds
        options
            .AddJob<ProcessOutboxMessagesJob>(configure => configure.WithIdentity(JobName))
            .AddTrigger(
                configure =>
                    configure
                        .ForJob(JobName)
                        .WithSimpleSchedule(
                            schedule =>
                                schedule
                                    .WithIntervalInSeconds(_outboxOptions.IntervalInSeconds)
                                    .RepeatForever()
                        )
            );
    }
}
