using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TransactionSimulator.Application.Transactions.Interfaces;
using TransactionSimulator.Application.Transactions.Models.Domain;

namespace TransactionSimulator.Infrastructure.Persistence;

public class TransactionRepository : ITransactionRepository
{
    private readonly TransactionDbContext _dbContext;

    public TransactionRepository(TransactionDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task CreateTransactionAsync(Transaction transaction, CancellationToken cancellationToken = default)
    {
        await _dbContext.Transactions.AddAsync(
            transaction,
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

    }

    public async Task<List<Transaction>> GetApprovedTransactionsAsync(CancellationToken cancellationToken = default)
    {
        var approvedTransactions = await _dbContext.Transactions.AsNoTracking().Where(t => t.Status == TransactionStatus.Approved)
        .ToListAsync(cancellationToken);

        return approvedTransactions;
    }

    
}
