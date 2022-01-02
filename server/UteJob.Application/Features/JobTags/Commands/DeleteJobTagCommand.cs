using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTags.Commands
{
    public class DeleteJobTagCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteJobTagCommandHandler : IRequestHandler<DeleteJobTagCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteJobTagCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteJobTagCommand command, CancellationToken cancellationToken)
        {
            var jobTag = await _unitOfWork.Repository<JobTag>().GetByIdAsync(command.Id);
            if (jobTag != null)
            {
                await _unitOfWork.Repository<JobTag>().DeleteAsync(jobTag);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(jobTag.Id, "Job Tag Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Job Tag Not Found!");
            }
        }
    }
}
