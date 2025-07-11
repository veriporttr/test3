using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OfferManagement.API.Models;

namespace OfferManagement.API.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<OfferItem> OfferItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Company configuration
        builder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.TaxNumber).HasMaxLength(50);
            entity.Property(e => e.IBAN).HasMaxLength(50);
            entity.Property(e => e.Website).HasMaxLength(200);
            entity.Property(e => e.Logo).HasMaxLength(500);
        });

        // User-Company relationship
        builder.Entity<ApplicationUser>(entity =>
        {
            entity.HasOne(u => u.Company)
                  .WithMany(c => c.Users)
                  .HasForeignKey(u => u.CompanyId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Offer configuration
        builder.Entity<Offer>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.OfferNumber).IsRequired().HasMaxLength(50);
            entity.Property(e => e.CustomerName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CustomerEmail).IsRequired().HasMaxLength(100);
            entity.Property(e => e.CustomerPhone).HasMaxLength(20);
            entity.Property(e => e.CustomerAddress).IsRequired().HasMaxLength(500);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Notes).HasMaxLength(2000);

            entity.HasOne(o => o.User)
                  .WithMany(u => u.Offers)
                  .HasForeignKey(o => o.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(o => o.Company)
                  .WithMany(c => c.Offers)
                  .HasForeignKey(o => o.CompanyId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // OfferItem configuration
        builder.Entity<OfferItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(500);
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");

            entity.HasOne(oi => oi.Offer)
                  .WithMany(o => o.Items)
                  .HasForeignKey(oi => oi.OfferId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}