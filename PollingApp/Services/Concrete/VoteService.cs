using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Models.Common;
using Services.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Data;
using Microsoft.EntityFrameworkCore;
using Models.Items.Response;

using System;
using System.Linq;
using System.Threading.Tasks;
using Data.Contract;

namespace Services.Concrete
{





    public class VoteService : IVoteService
    {
        private readonly ApplicationDbContext _context;
        private readonly IVoteRepository _voteRepository;

        public VoteService(ApplicationDbContext context, IVoteRepository voteRepository)
        {
            _context = context;
            _voteRepository = voteRepository;
        }

        public async Task<ApiResponse<string>> VoteAsync(VoteDTO voteDto, string userId)
        {
            var poll = await _context.Polls
                .Include(p => p.Options)
                .FirstOrDefaultAsync(p => p.Id == voteDto.PollId);

            if (poll == null)
                return new ApiResponse<string>("Poll not found");

            if (poll.ExpirationDate < DateTime.UtcNow)
                return new ApiResponse<string>("Poll has expired");

            if (await _voteRepository.HasUserVotedAsync(voteDto.PollId, userId))
                return new ApiResponse<string>("User has already voted on this poll");

            var option = poll.Options.FirstOrDefault(o => o.Id == voteDto.OptionId);
            if (option == null)
                return new ApiResponse<string>("Invalid option");

            var vote = new Vote
            {
                PollId = voteDto.PollId,
                OptionId = voteDto.OptionId,
                UserId = userId
            };

            await _voteRepository.AddVoteAsync(vote);

            return new ApiResponse<string>("Vote cast successfully");
        }

        public async Task<ApiResponse<List<UserVoteDto>>> GetUserVotesAsync(string userId)
        {
            var votes = await _voteRepository.GetVotesByUserAsync(userId);

            return new ApiResponse<List<UserVoteDto>>
            {
                Data = votes,
                Success = true,
                StatusCode = 200,
                Message = "Votes fetched successfully."
            };
        }

        public async Task<List<PollWithVotesDto>> GetAllPollsWithVoteCountsAsync()
        {
            return await _context.Polls
                .Select(p => new PollWithVotesDto
                {
                    PollId = p.Id,
                    Question = p.Question,
                    CreatedAt = p.CreatedAt,
                    ExpirationDate = p.ExpirationDate,
                    Options = p.Options.Select(o => new OptionVoteDto
                    {
                        OptionId = o.Id,
                        OptionText = o.Text,
                        VoteCount = o.Votes.Count()
                    }).ToList()
                }).ToListAsync();
        }
    }



}
