using TransactionSimulator.Application.Transactions.Validators;

namespace TransactionSimulator.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<ITransactionService, TransactionService>();

        services.AddMapster();

        services.AddValidatorsFromAssemblyContaining<CreateTransactionRequestValidator>();
        services.AddFluentValidationAutoValidation();

        return services;
    }
}
