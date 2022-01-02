using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Jobs.Commands
{
    public class AddEditJobCommand : IRequest<Result<Job>>
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string Slug { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Benefits { get; set; }

        [Required]
        public string Requirements { get; set; }

        public decimal SalaryFrom { get; set; }
        public decimal SalaryTo { get; set; }
        public bool HideSalary { get; set; }
        public int NumOfPositions { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        public int CityId { get; set; }
        public int JobTypeId { get; set; }
        public int JobExperienceId { get; set; }
    }

    internal class AddEditJobCommandHandler : IRequestHandler<AddEditJobCommand, Result<Job>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public AddEditJobCommandHandler(IUnitOfWork<int> unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<Result<Job>> Handle(AddEditJobCommand command, CancellationToken cancellationToken)
        {
            var company = await _unitOfWork.Repository<Company>()
               .Entities
               .FirstOrDefaultAsync(c => c.CreatedBy == _currentUserService.UserId);
            if (company == null)
            {
                return await Result<Job>.FailAsync("Company Not Found!");
            }

            var city = await _unitOfWork.Repository<City>().GetByIdAsync(command.CityId);
            if (city == null)
            {
                return await Result<Job>.FailAsync("City Not Found!");
            }

            var jobType = await _unitOfWork.Repository<JobType>().GetByIdAsync(command.JobTypeId);
            if (jobType == null)
            {
                return await Result<Job>.FailAsync("JobType Not Found!");
            }

            var jobExperience = await _unitOfWork.Repository<JobExperience>().GetByIdAsync(command.JobExperienceId);
            if (jobExperience == null)
            {
                return await Result<Job>.FailAsync("Job Experience Not Found!");
            }

            if (command.Id == 0)
            {
                var job = new Job
                {
                    Id = 0,
                    CompanyId = company.Id,
                    Company = company,
                    CityId = command.CityId,
                    City = city,
                    JobTypeId = command.JobTypeId,
                    JobType = jobType,
                    JobExperienceId = command.JobExperienceId,
                    JobExperience = jobExperience,
                    Title = command.Title,
                    Slug = command.Slug,
                    Description = command.Description,
                    Benefits = command.Benefits,
                    Requirements = command.Requirements,
                    SalaryFrom = command.SalaryFrom,
                    SalaryTo = command.SalaryTo,
                    HideSalary = command.HideSalary,
                    NumOfPositions = command.NumOfPositions,
                    DateStart = command.DateStart,
                    DateEnd = command.DateEnd,
                };
                await _unitOfWork.Repository<Job>().AddAsync(job);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<Job>.SuccessAsync(job, "Job Saved");
            }
            else
            {
                var job = await _unitOfWork.Repository<Job>().GetByIdAsync(command.Id);
                if (job != null)
                {
                    job.CompanyId = company.Id;
                    job.Company = company;
                    job.CityId = city.Id;
                    job.City = city;
                    job.JobTypeId = jobType.Id;
                    job.JobType = jobType;
                    job.JobExperienceId = jobExperience.Id;
                    job.JobExperience = jobExperience;
                    job.Title = command.Title ?? job.Title;
                    job.Slug = command.Slug ?? job.Slug;
                    job.Description = command.Description ?? job.Description;
                    job.Benefits = command.Benefits ?? job.Benefits;
                    job.Requirements = command.Requirements ?? job.Requirements;
                    job.SalaryFrom = command.SalaryFrom;
                    job.SalaryTo = command.SalaryTo;
                    job.HideSalary = command.HideSalary;
                    job.NumOfPositions = command.NumOfPositions;
                    job.DateStart = command.DateStart;
                    job.DateEnd = command.DateEnd;

                    await _unitOfWork.Repository<Job>().UpdateAsync(job);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<Job>.SuccessAsync(job, "Job Updated");
                }
                else
                {
                    return await Result<Job>.FailAsync("Job Not Found!");
                }
            }
        }
    }
}
