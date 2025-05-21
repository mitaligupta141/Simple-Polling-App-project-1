
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Data.Contract
{
  
    public interface IPollRepository
    {


        Task<IEnumerable<Poll>> GetPollsByQuestionAndUserAsync(string question, string userId);
        Task<Poll> AddPollAsync(Poll poll);
        Task<List<Poll>> GetPollsAsync(int pageNumber, int pageSize);
        Task<List<Poll>> GetPollBySortAsync(string question);
        Task<List<Poll>> GetAllPollsWithVotesAsync();
        Task<List<Poll>> GetPollBySortingAsync( string sortField, string sortDirection);

        Task<List<Poll>> SearchPollsAsync( string search);
    }
}
