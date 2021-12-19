using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Jobs.Commands
{
    public class DeleteJobCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteJobCommandHandler : IRequestHandler<DeleteJobCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteJobCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteJobCommand command, CancellationToken cancellationToken)
        {
            var job = await _unitOfWork.Repository<Job>().GetByIdAsync(command.Id);
            if (job != null)
            {
                await _unitOfWork.Repository<Job>().DeleteAsync(job);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(job.Id, "Job Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Job Not Found!");
            }
        }
    }
}
