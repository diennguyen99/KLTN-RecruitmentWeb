using AutoMapper;
using UteJob.Application.Features.ProfileEducations.Commands;
using UteJob.Application.Features.ProfileEducations.Queries;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class ProfileEdicationProfile : Profile
    {
        public ProfileEdicationProfile()
        {
            CreateMap<AddEditProfileEducationCommand, ProfileEducation>().ReverseMap();
            CreateMap<ProfileEducationResponse, ProfileEducation>().ReverseMap();
        }
    }
}
