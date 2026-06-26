namespace TransactionSimulator.Application.Transactions.Validators;

public class CreateTransactionRequestValidator : AbstractValidator<CreateTransactionRequestDto>
{
    public CreateTransactionRequestValidator()
    {
        RuleFor(x => x.Region)
                .IsInEnum()
                .WithMessage("Invalid region");

        RuleFor(x => x.SubmittedTimeUtc)
            .NotEmpty()
            .WithMessage("Submitted time is required");
        
    }
}
