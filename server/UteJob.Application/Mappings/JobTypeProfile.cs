using AutoMapper;
using UteJob.Application.Features.JobTypes.Commands;
using UteJob.Application.Features.JobTypes.Queries.GetAll;
using UteJob.Application.Features.JobTypes.Queries.GetById;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class JobTypeProfile: Profile
    {
        public JobTypeProfile()
        {
            CreateMap<AddEditJobTypeCommand, JobType>().ReverseMap();
            CreateMap<GetAllJobTypesResponse, JobType>().ReverseMap();
            CreateMap<GetJobTypeByIdResponse, JobType>().ReverseMap();
        }
    }
}
