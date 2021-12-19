using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Skills.Commands
{
    public class DeleteSkillCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteSkillCommandHandler : IRequestHandler<DeleteSkillCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteSkillCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteSkillCommand command, CancellationToken cancellationToken)
        {
            var skill = await _unitOfWork.Repository<Skill>().GetByIdAsync(command.Id);
            if (skill != null)
            {
                await _unitOfWork.Repository<Skill>().DeleteAsync(skill);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(skill.Id, "Skill Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Skill Not Found!");
            }
        }
    }
}
