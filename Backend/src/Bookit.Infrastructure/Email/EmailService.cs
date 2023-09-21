using System;
using Bookit.Application.Abstractions.Email;

namespace Bookit.Infrastructure.Email
{
    internal sealed class EmailService : IEmailService
    {
        public Task SendAsync(Domain.Users.Email recepient, string subject, string body)
        {
            return Task.CompletedTask;
        }
    }
}
