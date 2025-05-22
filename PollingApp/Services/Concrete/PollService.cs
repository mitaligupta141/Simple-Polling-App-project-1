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
using System.Collections.Generic;
using System.Threading.Tasks;
using Data;
using Models.Items.Response;

using AutoMapper;
using Data.Contract;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.EntityFrameworkCore;

using Services.Contract.PollingApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Concrete
{





    namespace PollingApp.Services
    {
        public class PollService : IPollService
        {





            private readonly IPollRepository _pollRepository;
            private readonly IMapper _mapper;

            public PollService(IPollRepository pollRepository, IMapper mapper)
            {
                _pollRepository = pollRepository;
                _mapper = mapper;
            }

            public async Task<ApiResponse<PollDto>> CreatePollAsync(CreatePollDto createPollDto, string userId)
            {
              
                if (createPollDto.Options == null || createPollDto.Options.Count < 2 || createPollDto.Options.Count > 10)
                {
                    return new ApiResponse<PollDto>("Poll must have between 2 and 10 options.");
                }

            
                userId = userId.Trim();
                var question = createPollDto.Question.Trim();
                var newOptions = createPollDto.Options.Select(o => o.Trim()).OrderBy(x => x).ToList();

             
                var existingPolls = await _pollRepository.GetPollsByQuestionAndUserAsync(question, userId);

                foreach (var existingPoll in existingPolls)
                {
                    var existingOptions = existingPoll.Options.Select(o => o.Text.Trim()).OrderBy(x => x).ToList();

                    if (newOptions.SequenceEqual(existingOptions))
                    {
                        return new ApiResponse<PollDto>("A poll with the same question and options already exists.");
                    }
                }

           
                var poll = new Poll
                {
                    Question = question,
                    ExpirationDate = createPollDto.ExpirationDate ?? DateTime.UtcNow.AddDays(7),
                    CreatedById = userId,
                    Options = createPollDto.Options.Select(o => new Option { Text = o.Trim() }).ToList()
                };

                var savedPoll = await _pollRepository.AddPollAsync(poll);
                var pollDto = _mapper.Map<PollDto>(savedPoll);

                return new ApiResponse<PollDto>(pollDto);
            }


            public async Task<ApiResponse<IEnumerable<PollDto>>> GetPollsAsync(int pageNumber, int pageSize)
            {
                var polls = await _pollRepository.GetPollsAsync(pageNumber, pageSize);

                var pollDtos = polls.Select(p => new PollDto
                {
                    Id = p.Id,
                    Question = p.Question,
                    CreatedAt = p.CreatedAt,
                    ExpirationDate = p.ExpirationDate,
                    Options = p.Options.Select(o => new OptionDto
                    {
                        Id = o.Id,
                        Text = o.Text
                    }).ToList(),
                    TotalVotes = p.Options.Sum(o => o.Votes.Count)
                });

                return new ApiResponse<IEnumerable<PollDto>>(pollDtos);
            }

            public async Task<ApiResponse<List<PollDto>>> GetPollBynameAsync(string search)
            {
                var polls = await _pollRepository.GetPollBySortAsync(search);

                if (polls == null || !polls.Any())
                    return new ApiResponse<List<PollDto>>("No polls found");

                var pollDtos = _mapper.Map<List<PollDto>>(polls);
                return new ApiResponse<List<PollDto>>(pollDtos);
            }

            public async Task<List<PollWithVotesDto>> GetAllPollsWithVoteCountsAsync()
            {
                var polls = await _pollRepository.GetAllPollsWithVotesAsync();

                return polls.Select(p => new PollWithVotesDto
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
                }).ToList();
            }


            public async Task<ApiResponse<List<PollDto>>> GetPollBySort( string sortField, string sortDirection)
            {
                var polls = await _pollRepository.GetPollBySortingAsync( sortField, sortDirection);

                if (polls == null || !polls.Any())
                    return new ApiResponse<List<PollDto>>("No polls found");

                var pollDtos = _mapper.Map<List<PollDto>>(polls);
                return new ApiResponse<List<PollDto>>(pollDtos);
            }


            public async Task<ApiResponse<List<PollDto>>> GetPollBySearchAsync( string search)
            {
                var polls = await _pollRepository.SearchPollsAsync( search);

                if (polls == null || !polls.Any())
                    return new ApiResponse<List<PollDto>>("No polls found");

                var pollDtos = _mapper.Map<List<PollDto>>(polls);
                return new ApiResponse<List<PollDto>>(pollDtos);
            }

        }


    }
}
       
        
