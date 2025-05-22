using System;
using Data.Contract;
using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;



namespace Data.Concrete
{

   
    public class PollRepository : IPollRepository
    {
        private readonly ApplicationDbContext _context;

        public PollRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Poll> AddPollAsync(Poll poll)
        {
            _context.Polls.Add(poll);
            await _context.SaveChangesAsync();
            return poll;
        }

        public async Task<List<Poll>> GetPollsAsync(int pageNumber, int pageSize)
        {
            return await _context.Polls
                .Include(p => p.Options)
                    .ThenInclude(o => o.Votes)
                .OrderByDescending(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<List<Poll>> GetPollBySortAsync(string question)
        {
            return await _context.Polls
                .Include(p => p.Options)
                .Where(p => p.Question.Contains(question))
                .ToListAsync();
        }

        public async Task<List<Poll>> GetAllPollsWithVotesAsync()
        {
            return await _context.Polls
                .Include(p => p.Options)
                    .ThenInclude(o => o.Votes)
                .ToListAsync();
        }


        public async Task<List<Poll>> GetPollBySortingAsync( string sortField, string sortDirection)
        {
            var query = _context.Polls
                .Include(p => p.Options)
                .Include(p => p.Votes)
                .AsQueryable();

            query = sortField.ToLower() switch
            {
                "question" => sortDirection == "desc"
                    ? query.OrderByDescending(p => p.Question)
                    : query.OrderBy(p => p.Question),

                "createdat" => sortDirection == "desc"
                    ? query.OrderByDescending(p => p.CreatedAt)
                    : query.OrderBy(p => p.CreatedAt),

                "expirationdate" => sortDirection == "desc"
                    ? query.OrderByDescending(p => p.ExpirationDate)
                    : query.OrderBy(p => p.ExpirationDate),

                "totalvotes" => sortDirection == "desc"
                    ? query.OrderByDescending(p => p.Votes.Count)
                    : query.OrderBy(p => p.Votes.Count),

                _ => query.OrderBy(p => p.CreatedAt) 
            };

            return await query.ToListAsync();
        }


        public async Task<List<Poll>> SearchPollsAsync(string search)
        {
           
            if (string.IsNullOrWhiteSpace(search))
            {
                return await _context.Polls
                    .Include(p => p.Options)
                    .Include(p => p.Votes)
                    .ToListAsync();
            }

            search = search.ToLower();

            var polls = await _context.Polls
                .Include(p => p.Options)
                .Include(p => p.Votes)
                .ToListAsync();

      
            var filteredPolls = polls.Where(p =>
                p.Question.ToLower().Contains(search) ||
                p.CreatedAt.ToString("yyyy-MM-dd").ToLower().Contains(search) ||
                p.ExpirationDate.ToString("yyyy-MM-dd").ToLower().Contains(search) ||
                p.Votes.Count().ToString().Contains(search)
            ).ToList();

            return filteredPolls;
        }


        public async Task<IEnumerable<Poll>> GetPollsByQuestionAndUserAsync(string question, string userId)
        {
            return await _context.Polls
                .Include(p => p.Options)
                .Where(p => p.Question == question && p.CreatedById == userId)
                .ToListAsync();
        }


    }
}
