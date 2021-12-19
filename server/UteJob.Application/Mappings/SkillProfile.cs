using AutoMapper;
using UteJob.Application.Features.Skills.Commands;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class SkillProfile : Profile
    {
        public SkillProfile()
        {
            CreateMap<AddEditSkillCommand, Skill>().ReverseMap();
        }
    }
}
