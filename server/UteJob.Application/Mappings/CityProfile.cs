using AutoMapper;
using UteJob.Application.Features.Cities.Commands;
using UteJob.Application.Features.Cities.Queries.GetAllPaged;
using UteJob.Application.Features.Cities.Queries.GetById;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class CityProfile : Profile
    {
        public CityProfile()
        {
            CreateMap<AddEditCityCommand, City>().ReverseMap();
            CreateMap<GetAllPagedCitiesResponse, City>().ReverseMap();
            CreateMap<GetCityByIdResponse, City>().ReverseMap();
        }
    }
}
