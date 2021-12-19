using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.CVs.Commands
{
    public class DeleteCVCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteCVCommandHandler : IRequestHandler<DeleteCVCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteCVCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteCVCommand command, CancellationToken cancellationToken)
        {
            var cv = await _unitOfWork.Repository<CV>().GetByIdAsync(command.Id);
            if (cv != null)
            {
                await _unitOfWork.Repository<CV>().DeleteAsync(cv);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(cv.Id, "CV Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("CV Not Found!");
            }
        }
    }
}
