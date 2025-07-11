using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OfferManagement.API.DTOs;
using OfferManagement.API.Services;

namespace OfferManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OffersController : ControllerBase
{
    private readonly IOfferService _offerService;

    public OffersController(IOfferService offerService)
    {
        _offerService = offerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetOffers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return BadRequest("Invalid user");
        }

        var offers = await _offerService.GetOffersByUserAsync(userId, page, pageSize);
        return Ok(offers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOffer(int id)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return BadRequest("Invalid user");
        }

        var offer = await _offerService.GetOfferByIdAsync(id, userId);
        if (offer == null)
        {
            return NotFound("Offer not found");
        }

        return Ok(offer);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOffer([FromBody] CreateOfferRequest request)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return BadRequest("Invalid user");
        }

        var offer = await _offerService.CreateOfferAsync(request, userId);
        if (offer == null)
        {
            return BadRequest("Failed to create offer");
        }

        return CreatedAtAction(nameof(GetOffer), new { id = offer.Id }, offer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOffer(int id, [FromBody] UpdateOfferRequest request)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return BadRequest("Invalid user");
        }

        var offer = await _offerService.UpdateOfferAsync(id, request, userId);
        if (offer == null)
        {
            return NotFound("Offer not found");
        }

        return Ok(offer);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOffer(int id)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return BadRequest("Invalid user");
        }

        var success = await _offerService.DeleteOfferAsync(id, userId);
        if (!success)
        {
            return NotFound("Offer not found");
        }

        return Ok(new { Success = true, Message = "Offer deleted successfully" });
    }

    [HttpPost("{id}/send")]
    public async Task<IActionResult> SendOffer(int id)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return BadRequest("Invalid user");
        }

        var success = await _offerService.SendOfferAsync(id, userId);
        if (!success)
        {
            return BadRequest("Failed to send offer");
        }

        return Ok(new { Success = true, Message = "Offer sent successfully" });
    }
}