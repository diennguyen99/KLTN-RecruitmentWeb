using MediatR;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Extensions;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Specifications;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Jobs.Queries
{
    public class GetAllPagedJobsQuery : IRequest<PaginatedResult<JobResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString { get; set; }
        public string[] OrderBy { get; set; }

        public GetAllPagedJobsQuery(int pageNumber, int pageSize, string searchString, string orderBy)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            SearchString = searchString;
            if (!string.IsNullOrWhiteSpace(orderBy))
            {
                OrderBy = orderBy.Split(',');
            }
        }
    }

    internal class GetAllPagedJobsQueryHandler : IRequestHandler<GetAllPagedJobsQuery, PaginatedResult<JobResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedJobsQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<JobResponse>> Handle(GetAllPagedJobsQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Job, JobResponse>> expression = e => new JobResponse
            {
                Id = e.Id,
                Title = e.Title,
                City = e.City,
                JobTypeId = e.JobTypeId,
                JobExperienceId = e.JobExperienceId,
                DateStart = e.DateStart,
                DateEnd = e.DateEnd,
                CreatedOn = e.CreatedOn,
                CompanyName = e.Company.Name
            };

            var jobFilterSpec = new JobFilterSpecification(request.SearchString);
            if (request.OrderBy?.Any() != true)
            {
                var data = await _unitOfWork.Repository<Job>().Entities
                   .Specify(jobFilterSpec)
                   .Where(j => j.DateStart <= DateTime.Now && j.DateEnd >= DateTime.Now)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
            else
            {
                var ordering = string.Join(",", request.OrderBy);
                var data = await _unitOfWork.Repository<Job>().Entities
                   .Specify(jobFilterSpec)
                   .Where(j => j.DateStart <= DateTime.Now && j.DateEnd >= DateTime.Now)
                   .OrderBy(ordering)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
        }
    }
}
