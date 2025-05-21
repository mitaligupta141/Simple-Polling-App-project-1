using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Common;
using Services.Contract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using Models.DTOS.Vote;
using Microsoft.AspNetCore.Identity;
using Services.Concrete;


namespace InventoryAPI.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VoteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVoteService _voteService;

        public VoteController(ApplicationDbContext context , UserManager<ApplicationUser> userManager , IVoteService voteService)
        {
            _context = context;
            _userManager = userManager;
            _voteService = voteService;
        }

        [HttpPost("cast")]
        public async Task<IActionResult> CastVote(CastVoteDto model)
        {
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByNameAsync(username);

            var userId = user.Id;


         

            var option = await _context.Options
                .Include(o => o.Poll)
                .FirstOrDefaultAsync(o => o.Id == model.OptionId);

            if (option == null)
            {
                return NotFound("Option not found.");
            }

         

            var existingVote = await _context.Votes
                .AnyAsync(v => v.UserId == userId && v.Option.PollId == option.PollId);

            if (existingVote)
            {
                return BadRequest("You have already voted in this poll.");
            }

            var vote = new Vote
            {
                OptionId = model.OptionId,
                UserId = userId,
                PollId = option.PollId

            };

            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vote cast successfully." });
        }

        [HttpGet("user-votes")]
        public async Task<IActionResult> GetUserVotes()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            

            var user = await _userManager.FindByNameAsync(username);

            var userId = user.Id;
            var result = await _voteService.GetUserVotesAsync(userId);
            return StatusCode(result.StatusCode, result);
        }



        [HttpGet("polls-with-votes")]
        [AllowAnonymous] 
        public async Task<IActionResult> GetPollsWithVotes()
        {
            var polls = await _voteService.GetAllPollsWithVoteCountsAsync();

            

            return Ok(polls);
        }
    }

}
