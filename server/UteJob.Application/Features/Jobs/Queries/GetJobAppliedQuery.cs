using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Jobs.Queries
{
    public class GetJobAppliedQuery : IRequest<Result<bool>>
    {
        public string Slug { get; set; }
    }

    internal class GetJobAppliedQueryHandler : IRequestHandler<GetJobAppliedQuery, Result<bool>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public GetJobAppliedQueryHandler(IUnitOfWork<int> unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<Result<bool>> Handle(GetJobAppliedQuery query, CancellationToken cancellationToken)
        {
            var job = await _unitOfWork.Repository<Job>()
                        .Entities
                        .FirstOrDefaultAsync(j => j.Slug == query.Slug);

            if (job == null)
            {
                return await Result<bool>.SuccessAsync(false, "Job Not Found");
            }

            var appliedJob = await _unitOfWork.Repository<AppliedJob>()
                .Entities
                .FirstOrDefaultAsync(a => a.JobId == job.Id && a.CreatedBy == _currentUserService.UserId);

            if (appliedJob == null)
            {
                return await Result<bool>.SuccessAsync(false, "Not Applied Job");
            }

            return await Result<bool>.SuccessAsync(true, "Applied Job");
        }
    }
}
