using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Cities.Commands
{
    public class DeleteCityCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteCityCommandHandler : IRequestHandler<DeleteCityCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteCityCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteCityCommand command, CancellationToken cancellationToken)
        {
            var city = await _unitOfWork.Repository<City>().GetByIdAsync(command.Id);
            if (city != null)
            {
                await _unitOfWork.Repository<City>().DeleteAsync(city);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(city.Id, "City Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("City Not Found!");
            }
        }
    }
}
