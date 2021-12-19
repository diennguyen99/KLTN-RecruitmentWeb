using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Tags.Commands
{
    public class DeleteTagCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteTagCommandHandler : IRequestHandler<DeleteTagCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteTagCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteTagCommand command, CancellationToken cancellationToken)
        {
            var tag = await _unitOfWork.Repository<Tag>().GetByIdAsync(command.Id);
            if (tag != null)
            {
                await _unitOfWork.Repository<Tag>().DeleteAsync(tag);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(tag.Id, "Tag Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Tag Not Found!");
            }
        }
    }
}
