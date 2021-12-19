using AutoMapper;
using UteJob.Application.Features.Companies.Queries;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class CompanyProfile : Profile
    {
        public CompanyProfile()
        {
            CreateMap<CompanyResponse, Company>().ReverseMap();
        }
    }
}
