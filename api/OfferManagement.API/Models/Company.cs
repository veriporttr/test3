using System.ComponentModel.DataAnnotations;

namespace OfferManagement.API.Models;

public class Company
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string? Logo { get; set; }
    
    [Required]
    public string Address { get; set; } = string.Empty;
    
    [Required]
    public string Phone { get; set; } = string.Empty;
    
    [Required]
    public string Email { get; set; } = string.Empty;
    
    public string? TaxNumber { get; set; }
    
    public string? IBAN { get; set; }
    
    public string? Website { get; set; }
    
    public bool HasActiveSubscription { get; set; } = false;
    
    public DateTime? SubscriptionStartDate { get; set; }
    
    public DateTime? SubscriptionEndDate { get; set; }
    
    public decimal MonthlyFee { get; set; } = 99.00m;
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
    
    public ICollection<Offer> Offers { get; set; } = new List<Offer>();
}
