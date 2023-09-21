using Bookit.Infrastructure.Outbox;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bookit.Infrastructure.Configurations;

public class OutboxMessageConfiguration : IEntityTypeConfiguration<OutboxMessage>
{
    public void Configure(EntityTypeBuilder<OutboxMessage> builder)
    {
        builder.ToTable("outbox_messages");
        builder.HasKey(outboxMessage => outboxMessage.Id);
        //json serialization of the message content - Postgres nativley supports json
        builder.Property(outboxMessage => outboxMessage.Content).HasColumnType("json");
    }
}
