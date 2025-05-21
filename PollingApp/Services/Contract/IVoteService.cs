using AutoMapper;
using Data;
using Data.Contract;
using Models.Items.Request;
using Models.Items.Response;
using Models.Common;

using System.Threading.Tasks;

namespace Services.Contract
{


  
        public interface IVoteService
        {
   
        Task<ApiResponse<List<UserVoteDto>>> GetUserVotesAsync(string userId);

        Task<List<PollWithVotesDto>> GetAllPollsWithVoteCountsAsync();



    }
    
}
