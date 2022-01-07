using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Favorites.Commands
{
    public class AddJobFavoriteCommand : IRequest<Result<int>>
    {
        public int JobId { get; set; }
    }

    internal class AddJobFavoriteCommandHanler : IRequestHandler<AddJobFavoriteCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddJobFavoriteCommandHanler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(AddJobFavoriteCommand request, CancellationToken cancellationToken)
        {
            var job = await _unitOfWork.Repository<Job>().GetByIdAsync(request.JobId);

            var favorite = new Favorite
            {
                Job = job,
                JobId = job.Id
            };
            await _unitOfWork.Repository<Favorite>().AddAsync(favorite);
            await _unitOfWork.Commit(cancellationToken);
            return await Result<int>.SuccessAsync(favorite.Id, "Favorite Saved");
        }
    }
}
