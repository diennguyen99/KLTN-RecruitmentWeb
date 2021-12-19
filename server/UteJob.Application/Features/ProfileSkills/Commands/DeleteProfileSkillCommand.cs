using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileSkills.Commands
{
    public class DeleteProfileSkillCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteProfileSkillCommandHandler : IRequestHandler<DeleteProfileSkillCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteProfileSkillCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteProfileSkillCommand command, CancellationToken cancellationToken)
        {
            var profileSkill = await _unitOfWork.Repository<ProfileSkill>().GetByIdAsync(command.Id);
            if (profileSkill != null)
            {
                await _unitOfWork.Repository<ProfileSkill>().DeleteAsync(profileSkill);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileSkill.Id, "Profile Skill Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Profile Skill Not Found!");
            }
        }
    }
}
