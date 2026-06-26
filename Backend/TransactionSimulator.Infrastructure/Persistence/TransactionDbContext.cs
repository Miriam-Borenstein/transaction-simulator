using Microsoft.EntityFrameworkCore;
using TransactionSimulator.Application.Transactions.Models.Domain;

namespace TransactionSimulator.Infrastructure.Persistence;

public class TransactionDbContext : DbContext
{
    public TransactionDbContext(
        DbContextOptions<TransactionDbContext> options)
        : base(options)
    {
    }

    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.TransactionId);

            entity.Property(t => t.Region)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(t => t.SubmittedTimeUtc)
                  .IsRequired();

            entity.Property(t => t.LocalTimeAtRegion)
                  .IsRequired();

            entity.Property(t => t.Status)
                  .IsRequired();

            entity.Property(t => t.CreatedAtUtc)
                  .IsRequired();
        });
    }
}
