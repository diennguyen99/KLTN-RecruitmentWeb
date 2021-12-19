using AutoMapper;
using UteJob.Application.Features.JobExperiences.Commands;
using UteJob.Application.Features.JobExperiences.Queries.GetAll;
using UteJob.Application.Features.JobExperiences.Queries.GetById;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class JobExperienceMapping: Profile
    {
        public JobExperienceMapping()
        {
            CreateMap<AddEditJobExperienceCommand, JobExperience>().ReverseMap();
            CreateMap<GetAllJobExperiencesResponse, JobExperience>().ReverseMap();
            CreateMap<GetJobExperienceByIdResponse, JobExperience>().ReverseMap();
        }
    }
}
