namespace OfferManagement.API.DTOs;

public class DashboardStatsDto
{
    public int TotalCompanies { get; set; }
    public int ActiveCompanies { get; set; }
    public int TotalUsers { get; set; }
    public int TotalOffers { get; set; }
    public decimal MonthlyRevenue { get; set; }
    public decimal TotalRevenue { get; set; }
}

public class CompanyStatsDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int UserCount { get; set; }
    public int OfferCount { get; set; }
    public bool HasActiveSubscription { get; set; }
    public DateTime? SubscriptionStartDate { get; set; }
    public DateTime? SubscriptionEndDate { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdateSubscriptionRequest
{
    public bool HasActiveSubscription { get; set; }
    public DateTime? SubscriptionStartDate { get; set; }
    public DateTime? SubscriptionEndDate { get; set; }
}