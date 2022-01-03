using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Extensions;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Specifications;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTags.Queries
{
    public class GetAllPagedJobTagsQuery : IRequest<PaginatedResult<JobTagResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Tag { get; set; }
        public string City { get; set; }
        public int JobTypeId { get; set; }
        public int JobExperienceId { get; set; }
        public string[] OrderBy { get; set; }

        public GetAllPagedJobTagsQuery(
            int pageNumber, int pageSize,
            string tag, string city,
            int jobTypeId, int jobExperienceId, string orderBy)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            Tag = tag;
            City = city;
            JobTypeId = jobTypeId;
            JobExperienceId = jobExperienceId;
            if (!string.IsNullOrWhiteSpace(orderBy))
            {
                OrderBy = orderBy.Split(',');
            }
        }
    }

    internal class GetAllPagedCompaniesQueryHandler : IRequestHandler<GetAllPagedJobTagsQuery, PaginatedResult<JobTagResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedCompaniesQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<JobTagResponse>> Handle(GetAllPagedJobTagsQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<JobTag, JobTagResponse>> expression = e => new JobTagResponse
            {
                Id = e.Id,
                JobId = e.Job.Id,
                TagId = e.Tag.Id,
                Company = e.Job.Company.Name,
                CompanyLogo = e.Job.Company.Logo,
                City = e.Job.City.Name,
                JobType = e.Job.JobType.Name,
                JobExperience = e.Job.JobExperience.Name,
                JobTitle = e.Job.Title,
                JobSlug = e.Job.Slug,
                SalaryFrom = e.Job.SalaryFrom,
                SalaryTo = e.Job.SalaryTo,
                HideSalary = e.Job.HideSalary,
                JobCreatedOn = e.Job.CreatedOn,
            };

            var jobTagFilterSpec = new JobTagFilterSpecification(request.Tag, request.City, request.JobTypeId, request.JobExperienceId);
            if (request.OrderBy?.Any() != true)
            {
                var data = await _unitOfWork.Repository<JobTag>().Entities
                   .Specify(jobTagFilterSpec)
                   .Where(j => j.Job.DateStart <= DateTime.Now && j.Job.DateEnd >= DateTime.Now)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
            else
            {
                var ordering = string.Join(",", request.OrderBy);
                var data = await _unitOfWork.Repository<JobTag>().Entities
                   .Specify(jobTagFilterSpec)
                   .Where(j => j.Job.DateStart <= DateTime.Now && j.Job.DateEnd >= DateTime.Now)
                   .OrderBy(ordering)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
        }
    }
}
