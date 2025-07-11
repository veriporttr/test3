using Microsoft.EntityFrameworkCore;
using OfferManagement.API.Data;
using OfferManagement.API.DTOs;

namespace OfferManagement.API.Services;

public class SuperAdminService : ISuperAdminService
{
    private readonly ApplicationDbContext _context;

    public SuperAdminService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var totalCompanies = await _context.Companies.CountAsync();
        var activeCompanies = await _context.Companies.CountAsync(c => c.IsActive && c.HasActiveSubscription);
        var totalUsers = await _context.Users.CountAsync(u => !u.IsSuperAdmin);
        var totalOffers = await _context.Offers.CountAsync();

        var currentMonth = DateTime.UtcNow.Month;
        var currentYear = DateTime.UtcNow.Year;
        
        var monthlyRevenue = await _context.Companies
            .Where(c => c.HasActiveSubscription && 
                       c.SubscriptionStartDate.HasValue &&
                       c.SubscriptionStartDate.Value.Month == currentMonth &&
                       c.SubscriptionStartDate.Value.Year == currentYear)
            .SumAsync(c => c.MonthlyFee);

        var totalRevenue = await _context.Companies
            .Where(c => c.HasActiveSubscription)
            .SumAsync(c => c.MonthlyFee);

        return new DashboardStatsDto
        {
            TotalCompanies = totalCompanies,
            ActiveCompanies = activeCompanies,
            TotalUsers = totalUsers,
            TotalOffers = totalOffers,
            MonthlyRevenue = monthlyRevenue,
            TotalRevenue = totalRevenue
        };
    }

    public async Task<List<CompanyStatsDto>> GetCompanyStatsAsync()
    {
        var companies = await _context.Companies
            .Include(c => c.Users)
            .Include(c => c.Offers)
            .Select(c => new CompanyStatsDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                UserCount = c.Users.Count,
                OfferCount = c.Offers.Count,
                HasActiveSubscription = c.HasActiveSubscription,
                SubscriptionStartDate = c.SubscriptionStartDate,
                SubscriptionEndDate = c.SubscriptionEndDate,
                CreatedAt = c.CreatedAt
            })
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

        return companies;
    }

    public async Task<bool> UpdateCompanySubscriptionAsync(int companyId, UpdateSubscriptionRequest request)
    {
        var company = await _context.Companies.FindAsync(companyId);
        if (company == null) return false;

        company.HasActiveSubscription = request.HasActiveSubscription;
        company.SubscriptionStartDate = request.SubscriptionStartDate;
        company.SubscriptionEndDate = request.SubscriptionEndDate;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ToggleCompanyStatusAsync(int companyId)
    {
        var company = await _context.Companies.FindAsync(companyId);
        if (company == null) return false;

        company.IsActive = !company.IsActive;
        await _context.SaveChangesAsync();
        return true;
    }
}