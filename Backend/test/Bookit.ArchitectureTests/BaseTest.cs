using System.Reflection;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Bookit.Infrastructure;

namespace Bookit.ArchitectureTests;

public class BaseTest
{
    protected static Assembly ApplicationAssembly => typeof(IBaseCommand).Assembly;

    protected static Assembly DomainAssembly => typeof(IEntity).Assembly;

    protected static Assembly InfrastructureAssembly => typeof(ApplicationDbContext).Assembly;
}
