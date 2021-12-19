using AutoMapper;
using UteJob.Application.Features.ProfileSkills.Queries;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class ProfileSkillProfile : Profile
    {
        public ProfileSkillProfile()
        {
            CreateMap<ProfileSkillResponse, ProfileSkill>().ReverseMap();
        }
    }
}
