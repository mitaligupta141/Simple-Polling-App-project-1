using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Common;
using Services.Contract;

namespace InventoryAPI.Controllers
{
    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Models.Items.Response;
    
    using Services.Concrete;
    using Services.Contract.PollingApp.Interfaces;
    using System.Security.Claims;

    namespace PollingApp.Controllers
    {
        [Authorize]
        [ApiController]
        [Route("api/[controller]")]
        public class PollController : ControllerBase
        {
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly ApplicationDbContext _context;
            private readonly IPollService _pollService;
            
            private readonly IMapper _mapper;

            public PollController(IPollService pollService, UserManager<ApplicationUser> userManager, IMapper mapper, ApplicationDbContext context)
            {
                _pollService = pollService;
                _userManager = userManager;
                _mapper = mapper;
             
                _context = context;
            }

            [HttpPost("create")]
            public async Task<IActionResult> CreatePoll([FromBody] CreatePollDto createPollDto)
            {

            

                var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

                var user = await _userManager.FindByNameAsync(username);

                var userId = user.Id;


                var result = await _pollService.CreatePollAsync(createPollDto, userId);
                return StatusCode(200, result);
            }

            [AllowAnonymous]
            [HttpGet("all")]
            public async Task<IActionResult> GetAllPolls([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
            {
                var result = await _pollService.GetPollsAsync(page, pageSize);
                return StatusCode(result.StatusCode, result);
            }

            [AllowAnonymous]
            [HttpGet("GetPollByName")]
            public async Task<IActionResult> GetPollByName(string search)
            {
                var result = await _pollService.GetPollBynameAsync(search);
                return StatusCode(result.StatusCode, result);
            }


            [AllowAnonymous]
            [HttpGet("GetPollBySort")]
            public async Task<IActionResult> SortPolls(string sortField = "CreatedAt", string sortDirection = "asc")
            {
                var result = await _pollService.GetPollBySort(sortField, sortDirection);
                return StatusCode(result.StatusCode, result);
            }




            [AllowAnonymous]
            [HttpGet("GetPollBySearch")]
            public async Task<IActionResult> GetPollBySearch( string search)
            {
                var result = await _pollService.GetPollBySearchAsync( search);
                return StatusCode(result.StatusCode, result);
            }


            [AllowAnonymous]
            [HttpGet("FilterByDate")]
            public async Task<IActionResult> FilterPollsByDate([FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate)
            {
                if (!fromDate.HasValue || !toDate.HasValue)
                {
                    return BadRequest(new
                    {
                        Message = "Both fromDate and toDate query parameters are required in 'yyyy-MM-dd' format."
                    });
                }

                if (fromDate > toDate)
                {
                    return BadRequest(new
                    {
                        Message = "fromDate cannot be later than toDate."
                    });
                }

                
                var startDate = fromDate.Value.Date;
                var endDate = toDate.Value.Date.AddDays(1).AddTicks(-1); 

                var polls = await _context.Polls
                    .Include(p => p.Options)
                    .Where(p => p.CreatedAt >= startDate && p.CreatedAt <= endDate)
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();

                var pollDtos = _mapper.Map<List<PollResponseDto>>(polls);

                return Ok(new
                {
                    StatusCode = 200,
                    Message = $"Polls filtered from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                    Data = pollDtos
                });
            }


            [AllowAnonymous]
            [HttpGet("FilterByDate1")]
            public async Task<IActionResult> FilterPollsByDate(
    [FromQuery] DateTime? fromDate,
    [FromQuery] DateTime? toDate,
    [FromQuery] bool? expired) // New param
            {
                if (!fromDate.HasValue || !toDate.HasValue)
                {
                    return BadRequest(new
                    {
                        Message = "Both fromDate and toDate query parameters are required in 'yyyy-MM-dd' format."
                    });
                }

                if (fromDate > toDate)
                {
                    return BadRequest(new
                    {
                        Message = "fromDate cannot be later than toDate."
                    });
                }

                var now = DateTime.UtcNow;

                var pollsQuery = _context.Polls
                    .Include(p => p.Options)
                    .Where(p => p.CreatedAt >= fromDate.Value && p.CreatedAt <= toDate.Value);

                if (expired.HasValue)
                {
                    if (expired.Value)
                    {
                   
                        pollsQuery = pollsQuery.Where(p => p.CreatedAt.AddDays(7) <= now);
                    }
                    else
                    {
                    
                        pollsQuery = pollsQuery.Where(p => p.CreatedAt.AddDays(7) > now);
                    }
                }

                var polls = await pollsQuery
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();

                var pollDtos = _mapper.Map<List<PollResponseDto>>(polls);

                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Polls filtered by date range and expiration.",
                    Data = pollDtos
                });
            }


        }
    }
}
