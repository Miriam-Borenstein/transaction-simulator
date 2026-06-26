using TransactionSimulator.Application.Transactions.Models.Domain;
namespace TransactionSimulator.Application.Transactions.Interfaces;

public interface IDateTimeService
{
    DateTime UtcNow();
    DateTime GetLocalTimeByRegion(Region region, DateTime time);
    DateTime ConvertTimeToUtc(Region region, DateTime localDateTime);
}
