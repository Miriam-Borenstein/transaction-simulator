namespace TransactionSimulator.Application.Transactions.Models.DTOs;

public record CreateTransactionRequestDto
(
    Region Region,
    DateTime SubmittedTimeUtc
);