using System;
using Data.Contract;
using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.Items.Response;



namespace Data.Concrete
{

  

    public class VoteRepository : IVoteRepository
    {
        private readonly ApplicationDbContext _context;

        public VoteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> HasUserVotedAsync(int pollId, string userId)
        {
            return await _context.Votes.AnyAsync(v => v.PollId == pollId && v.UserId == userId);
        }

        public async Task AddVoteAsync(Vote vote)
        {
            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserVoteDto>> GetVotesByUserAsync(string userId)
        {
            return await _context.Votes
                .Where(v => v.UserId == userId)
                .Select(v => new UserVoteDto
                {
                    Question = v.Poll.Question,
                    OptionText = v.Option.Text,
                    VotedAt = DateTime.UtcNow // Or use a real VotedAt field if available
                })
                .ToListAsync();
        }

    }
}
