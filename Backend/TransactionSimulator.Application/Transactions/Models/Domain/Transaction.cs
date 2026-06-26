namespace TransactionSimulator.Application.Transactions.Models.Domain;

public class Transaction
{
    public Guid TransactionId { get; set; }

    public string Region { get; set; } = string.Empty;

    public DateTime SubmittedTimeUtc { get; set; }

    public DateTime LocalTimeAtRegion { get; set; }

    public TransactionStatus Status { get; set; }

    public DateTime CreatedAtUtc { get; set; }

}