using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OfferManagement.API.DTOs;
using OfferManagement.API.Services;

namespace OfferManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SuperAdminController : ControllerBase
{
    private readonly ISuperAdminService _superAdminService;

    public SuperAdminController(ISuperAdminService superAdminService)
    {
        _superAdminService = superAdminService;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var isSuperAdmin = User.FindFirst("IsSuperAdmin")?.Value == "True";
        if (!isSuperAdmin)
        {
            return Forbid("Super admin access required");
        }

        var stats = await _superAdminService.GetDashboardStatsAsync();
        return Ok(stats);
    }

    [HttpGet("companies")]
    public async Task<IActionResult> GetCompanyStats()
    {
        var isSuperAdmin = User.FindFirst("IsSuperAdmin")?.Value == "True";
        if (!isSuperAdmin)
        {
            return Forbid("Super admin access required");
        }

        var companies = await _superAdminService.GetCompanyStatsAsync();
        return Ok(companies);
    }

    [HttpPut("companies/{id}/subscription")]
    public async Task<IActionResult> UpdateCompanySubscription(int id, [FromBody] UpdateSubscriptionRequest request)
    {
        var isSuperAdmin = User.FindFirst("IsSuperAdmin")?.Value == "True";
        if (!isSuperAdmin)
        {
            return Forbid("Super admin access required");
        }

        var success = await _superAdminService.UpdateCompanySubscriptionAsync(id, request);
        if (!success)
        {
            return NotFound("Company not found");
        }

        return Ok(new { Success = true, Message = "Subscription updated successfully" });
    }

    [HttpPost("companies/{id}/toggle-status")]
    public async Task<IActionResult> ToggleCompanyStatus(int id)
    {
        var isSuperAdmin = User.FindFirst("IsSuperAdmin")?.Value == "True";
        if (!isSuperAdmin)
        {
            return Forbid("Super admin access required");
        }

        var success = await _superAdminService.ToggleCompanyStatusAsync(id);
        if (!success)
        {
            return NotFound("Company not found");
        }

        return Ok(new { Success = true, Message = "Company status updated successfully" });
    }
}