using AutoMapper;
using UteJob.Application.Features.CVs.Commands;
using UteJob.Application.Features.CVs.Queries;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class CVProfile : Profile
    {
        public CVProfile()
        {
            CreateMap<AddEditCVCommand, CV>().ReverseMap();
            CreateMap<CVResponse, CV>().ReverseMap();
        }
    }
}
