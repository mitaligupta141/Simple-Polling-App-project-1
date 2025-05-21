using AutoMapper;
using Data;
using Models.Items.Request;
using Models.Items.Response;
using AutoMapper;



namespace Services.Mapper.ItemService
{
 
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Poll, PollDto>()
    .ForMember(dest => dest.TotalVotes, opt =>
        opt.MapFrom(src =>
            src.Options != null
                ? src.Options.Sum(o => o.Votes != null ? o.Votes.Count : 0)
                : 0))
    .ForMember(dest => dest.Options, opt => opt.MapFrom(src => src.Options));

            CreateMap<Option, OptionDto>()
                .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
            CreateMap<CreatePollDto, Poll>();
            CreateMap<CreatePollDto, Option>()
                .ForMember(dest => dest.PollId, opt => opt.Ignore());
            CreateMap<LoginDto, ApplicationUser>();
        }
    }
}
