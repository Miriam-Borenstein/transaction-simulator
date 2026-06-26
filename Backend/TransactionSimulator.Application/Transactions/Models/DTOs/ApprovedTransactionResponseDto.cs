namespace TransactionSimulator.Application.Transactions.Models.DTOs;

public record ApprovedTransactionResponseDto
(
    Guid TransactionId,

    string Region,

    DateTime SubmittedTimeUtc,

    DateTime LocalTimeAtRegion,

    TransactionStatus Status
);
