using TransactionSimulator.Application.Transactions.Models.Domain;

namespace TransactionSimulator.Application.Transactions.Interfaces;

public interface ITransactionRepository
{
    Task CreateTransactionAsync(Transaction createTransactionRequest, CancellationToken cancellationToken = default);
    Task<List<Transaction>> GetApprovedTransactionsAsync(CancellationToken cancellationToken = default);
}
