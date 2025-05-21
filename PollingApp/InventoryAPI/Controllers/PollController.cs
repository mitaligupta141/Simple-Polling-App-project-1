using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Common;
using Services.Contract;

namespace InventoryAPI.Controllers
{
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
            private readonly IPollService _pollService;

            public PollController(IPollService pollService, UserManager<ApplicationUser> userManager)
            {
                _pollService = pollService;
                _userManager = userManager;
            }

            [HttpPost("create")]
            public async Task<IActionResult> CreatePoll([FromBody] CreatePollDto createPollDto)
            {

                //var username = User.FindFirstValue(ClaimTypes.Name);  // Assuming 'Name' claim stores the username

                // Step 2: Find the user by username

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



        }
    }
}
