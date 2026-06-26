using TransactionSimulator.Application.Transactions.Interfaces;
using TransactionSimulator.Application.Transactions.Models.Domain;

namespace TransactionSimulator.Infrastructure.Services
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime ConvertTimeToUtc(Region region, DateTime localDateTime)
        {
            var tz = GetTimeZone(region);

            var utc = TimeZoneInfo.ConvertTimeToUtc(localDateTime, tz);

            return utc;
        }

        public DateTime GetLocalTimeByRegion(Region region, DateTime time)
        {
            var tz = GetTimeZone(region);

            return TimeZoneInfo.ConvertTimeFromUtc(time, tz);
        }

        public DateTime UtcNow()
        {
            return DateTime.UtcNow;
        }

        private static TimeZoneInfo GetTimeZone(Region region)
        {
            var timeZoneId = region switch
            {
                Region.Israel => "Israel Standard Time",
                Region.France => "Romance Standard Time",
                Region.USA => "Eastern Standard Time",
                Region.Japan => "Tokyo Standard Time",
                _ => throw new ArgumentOutOfRangeException(nameof(region), region, null)
            };

            return TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
        }
    }
}
