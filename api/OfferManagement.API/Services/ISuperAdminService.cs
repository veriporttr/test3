using OfferManagement.API.DTOs;

namespace OfferManagement.API.Services;

public interface ISuperAdminService
{
    Task<DashboardStatsDto> GetDashboardStatsAsync();
    Task<List<CompanyStatsDto>> GetCompanyStatsAsync();
    Task<bool> UpdateCompanySubscriptionAsync(int companyId, UpdateSubscriptionRequest request);
    Task<bool> ToggleCompanyStatusAsync(int companyId);
}