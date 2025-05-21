
using System.Collections.Generic;
using System.Threading.Tasks;
using Models.Items.Response;


namespace Data.Contract
{
  
    public interface IVoteRepository
    {
       

        Task<bool> HasUserVotedAsync(int pollId, string userId);
        Task AddVoteAsync(Vote vote);
        Task<List<UserVoteDto>> GetVotesByUserAsync(string userId);

    }
}
