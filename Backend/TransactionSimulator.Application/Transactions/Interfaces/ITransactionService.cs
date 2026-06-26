using TransactionSimulator.Application.Transactions.Models.DTOs;

namespace TransactionSimulator.Application.Transactions.Interfaces;

public interface ITransactionService
{
    Task<CreateTransactionResponseDto> CreateTransactionAsync(CreateTransactionRequestDto createTransactionRequest, CancellationToken cancellationToken = default);
    Task<List<ApprovedTransactionResponseDto>> GetApprovedTransactionsAsync(CancellationToken cancellationToken = default);
}
