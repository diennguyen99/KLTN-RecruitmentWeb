using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileEducations.Commands
{
    public class DeleteProfileEducationCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteProfileEducationCommandHandler : IRequestHandler<DeleteProfileEducationCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteProfileEducationCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteProfileEducationCommand command, CancellationToken cancellationToken)
        {
            var profileEducation = await _unitOfWork.Repository<ProfileEducation>().GetByIdAsync(command.Id);
            if (profileEducation != null)
            {
                await _unitOfWork.Repository<ProfileEducation>().DeleteAsync(profileEducation);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileEducation.Id, "Profile Education Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Profile Education Not Found!");
            }
        }
    }
}
