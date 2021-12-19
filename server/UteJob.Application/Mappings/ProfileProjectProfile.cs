using AutoMapper;
using UteJob.Application.Features.ProfileProjects.Queries.GetAll;
using UteJob.Application.Features.ProfileProjects.Queries.GetById;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class ProfileProjectProfile : Profile
    {
        public ProfileProjectProfile()
        {
            CreateMap<GetAllProfileProjectsResponse, ProfileProject>().ReverseMap();
            CreateMap<GetProfileProjectByIdResponse, ProfileProject>().ReverseMap();
        }
    }
}
