using AutoMapper;
using UteJob.Application.Features.ProfileExperiences.Commands;
using UteJob.Application.Features.ProfileExperiences.Queries;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class ProfileExperienceProfile : Profile
    {
        public ProfileExperienceProfile()
        {
            CreateMap<AddEditProfileExperienceCommand, ProfileExperience>().ReverseMap();
            CreateMap<ProfileExperienceResponse, ProfileExperience>().ReverseMap();
        }
    }
}
