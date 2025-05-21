using AutoMapper;
using Data;
using Data.Contract;
using Models.Items.Request;
using Models.Items.Response;
using Models.Common;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Contract
{
   

    namespace PollingApp.Interfaces
    {
        public interface IPollService
        {
            Task<ApiResponse<PollDto>> CreatePollAsync(CreatePollDto createPollDto, string userId);
            Task<ApiResponse<IEnumerable<PollDto>>> GetPollsAsync(int pageNumber, int pageSize);
            Task<ApiResponse<List<PollDto>>> GetPollBynameAsync(string search);

            Task<ApiResponse<List<PollDto>>> GetPollBySort(string sortField, string sortDirection);



            Task<ApiResponse<List<PollDto>>> GetPollBySearchAsync(string search);




        }
    }


}
