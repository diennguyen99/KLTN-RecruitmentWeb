using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Extensions;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.AppliedJobs.Queries
{
    public class GetAllPagedAppliedJobOfEmployerQuery : IRequest<PaginatedResult<AppliedJobOfCandidateResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string JobTitle { get; set; }

        public GetAllPagedAppliedJobOfEmployerQuery(int pageNumber, int pageSize, string jobTitle)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            JobTitle = jobTitle;
        }
    }

    internal class GetAllPagedAppliedJobOfEmployerQueryHandler : IRequestHandler<GetAllPagedAppliedJobOfEmployerQuery, PaginatedResult<AppliedJobOfCandidateResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public GetAllPagedAppliedJobOfEmployerQueryHandler(IUnitOfWork<int> unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<PaginatedResult<AppliedJobOfCandidateResponse>> Handle(GetAllPagedAppliedJobOfEmployerQuery request, CancellationToken cancellationToken)
        {
            var company = await _unitOfWork.Repository<Company>()
                            .Entities
                            .FirstOrDefaultAsync(c => c.CreatedBy == _currentUserService.UserId);

            Expression<Func<AppliedJob, AppliedJobOfCandidateResponse>> expression = e => new AppliedJobOfCandidateResponse
            {
                Id = e.Id,
                JobTitle = e.Job.Title,
                CVUrl = e.CV.URL,
                Description = e.Description,
                CompanyId = e.Job.CompanyId,
                Company = e.Job.Company,
                JobId = e.JobId,
                Job = e.Job,
                MyCVOnline = e.MyCVOnline,
                CVId = e.CVId ?? 0,
                CV = e.CV,
                CreatedOn = e.CreatedOn,
                CreatedBy = e.CreatedBy
            };

            if (!string.IsNullOrEmpty(request.JobTitle))
            {
                var data = await _unitOfWork.Repository<AppliedJob>().Entities
                    .Where(x => x.Job.CompanyId == company.Id && x.Job.Title.Contains(request.JobTitle))
                    .OrderByDescending(a => a.CreatedOn)
                    .Select(expression)
                    .ToPaginatedListAsync(request.PageNumber, request.PageSize);

                return data;
            }
            else
            {
                var data = await _unitOfWork.Repository<AppliedJob>().Entities
                    .OrderByDescending(a => a.CreatedOn)
                    .Select(expression)
                    .ToPaginatedListAsync(request.PageNumber, request.PageSize);

                return data;
            }
        }
    }
}
