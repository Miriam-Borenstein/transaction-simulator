using Microsoft.Extensions.Logging;

namespace TransactionSimulator.Application.Transactions.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IDateTimeService _dateTimeService;
    private readonly ILogger<TransactionService> _logger;

    public TransactionService(ITransactionRepository transactionRepository, IDateTimeService dateTimeService, ILogger<TransactionService> logger)
    {
        _transactionRepository = transactionRepository;
        _dateTimeService = dateTimeService;
        _logger = logger;
    }

    public async Task<CreateTransactionResponseDto> CreateTransactionAsync(CreateTransactionRequestDto createTransactionRequest, CancellationToken cancellationToken = default)
    {

        //calculate the local time by the request region and submitted time
        var utcSubmittedTime = createTransactionRequest.SubmittedTimeUtc;
        var localTime = _dateTimeService.GetLocalTimeByRegion(createTransactionRequest.Region, utcSubmittedTime);

        //TODO - implement the banking hours in constant
        var status = localTime.Hour >= 8 && localTime.Hour < 18 ? TransactionStatus.Approved : TransactionStatus.Rejected;

        var transaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            Region = createTransactionRequest.Region.ToString(),
            SubmittedTimeUtc = utcSubmittedTime,
            LocalTimeAtRegion = localTime,
            Status = status,
            CreatedAtUtc = _dateTimeService.UtcNow(),
        };


        await _transactionRepository.CreateTransactionAsync(transaction, cancellationToken);

        _logger.LogInformation("Transaction {TransactionId} created successfully", transaction.TransactionId);

        return transaction.Adapt<CreateTransactionResponseDto>();
        
    }

    public async Task<List<ApprovedTransactionResponseDto>> GetApprovedTransactionsAsync(CancellationToken cancellationToken = default)
    {
        var approvedTransactions = await _transactionRepository.GetApprovedTransactionsAsync(cancellationToken);
        
        var result = approvedTransactions.Adapt<List<ApprovedTransactionResponseDto>>();

        return result;
    }

   
}
