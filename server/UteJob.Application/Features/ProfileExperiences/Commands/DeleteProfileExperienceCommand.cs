using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileExperiences.Commands
{
    public class DeleteProfileExperienceCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteProfileExperienceCommandHandler : IRequestHandler<DeleteProfileExperienceCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteProfileExperienceCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteProfileExperienceCommand command, CancellationToken cancellationToken)
        {
            var profileExperience = await _unitOfWork.Repository<ProfileExperience>().GetByIdAsync(command.Id);
            if (profileExperience != null)
            {
                await _unitOfWork.Repository<ProfileExperience>().DeleteAsync(profileExperience);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileExperience.Id, "Profile Experience Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Profile Experience Not Found!");
            }
        }
    }
}
