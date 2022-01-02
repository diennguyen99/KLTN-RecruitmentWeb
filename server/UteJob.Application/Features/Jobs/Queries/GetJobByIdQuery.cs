using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Jobs.Queries
{
    public class GetJobByIdQuery : IRequest<Result<Job>>
    {
        public int Id { get; set; }
    }

    internal class GetJobByIdQueryHandler : IRequestHandler<GetJobByIdQuery, Result<Job>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetJobByIdQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Job>> Handle(GetJobByIdQuery query, CancellationToken cancellationToken)
        {
            var job = await _unitOfWork.Repository<Job>()
                .Entities
                .Include(j => j.Company)
                .Include(j => j.City)
                .Include(j => j.JobType)
                .Include(j => j.JobExperience)
                .FirstOrDefaultAsync(c => c.Id == query.Id);
            return await Result<Job>.SuccessAsync(job);
        }
    }
}
