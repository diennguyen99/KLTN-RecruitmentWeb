using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Favorites.Commands
{
    public class DeleteFavoriteCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteFavoriteCommandHandler : IRequestHandler<DeleteFavoriteCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteFavoriteCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteFavoriteCommand command, CancellationToken cancellationToken)
        {
            var favorite = await _unitOfWork.Repository<Favorite>().GetByIdAsync(command.Id);
            if (favorite != null)
            {
                await _unitOfWork.Repository<Favorite>().DeleteAsync(favorite);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(favorite.Id, "Favorite Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Favorite Not Found!");
            }
        }
    }
}
