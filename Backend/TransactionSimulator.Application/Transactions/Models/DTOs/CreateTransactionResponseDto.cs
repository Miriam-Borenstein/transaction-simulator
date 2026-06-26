namespace TransactionSimulator.Application.Transactions.Models.DTOs;

public record CreateTransactionResponseDto
(
    Guid TransactionId,
    TransactionStatus Status
);
