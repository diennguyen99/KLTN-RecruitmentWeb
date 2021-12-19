using AutoMapper;
using UteJob.Application.Features.ProfileSummarys.Commands;
using UteJob.Application.Features.ProfileSummarys.Queries;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class ProfileSummarySummary : Profile
    {
        public ProfileSummarySummary()
        {
            CreateMap<AddEditProfileSummaryCommand, ProfileSummary>().ReverseMap();
            CreateMap<ProfileSummaryResponse, ProfileSummary>().ReverseMap();
        }
    }
}
