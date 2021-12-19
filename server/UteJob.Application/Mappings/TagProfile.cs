using AutoMapper;
using UteJob.Application.Features.Tags.Commands;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class TagProfile : Profile
    {
        public TagProfile()
        {
            CreateMap<AddEditTagCommand, Tag>().ReverseMap();
        }
    }
}
