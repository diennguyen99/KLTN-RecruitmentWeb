using MediatR;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Extensions;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.AppliedJobs.Queries
{
    public class GetAllPagedAppliedJobOfCandidateQuery : IRequest<PaginatedResult<AppliedJobOfCandidateResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public GetAllPagedAppliedJobOfCandidateQuery(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }

    internal class GetAllPagedAppliedJobOfCandidateQueryHandler : IRequestHandler<GetAllPagedAppliedJobOfCandidateQuery, PaginatedResult<AppliedJobOfCandidateResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedAppliedJobOfCandidateQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<AppliedJobOfCandidateResponse>> Handle(GetAllPagedAppliedJobOfCandidateQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<AppliedJob, AppliedJobOfCandidateResponse>> expression = e => new AppliedJobOfCandidateResponse
            {
                Id = e.Id,
                Description = e.Description,
                CompanyId = e.Job.CompanyId,
                Company = e.Job.Company,
                JobId = e.JobId,
                Job = e.Job,
                MyCVOnline = e.MyCVOnline,
                CVId = e.CVId ?? 0,
                CV = e.CV
            };

            var data = await _unitOfWork.Repository<AppliedJob>().Entities
                   .OrderByDescending(a => a.CreatedOn)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);

            return data;
        }
    }
}
