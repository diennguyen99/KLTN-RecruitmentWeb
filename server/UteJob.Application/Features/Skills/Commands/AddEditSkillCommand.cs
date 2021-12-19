using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Skills.Commands
{
    public class AddEditSkillCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }

    internal class AddEditSkillCommandHandler : IRequestHandler<AddEditSkillCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditSkillCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditSkillCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var skill = _mapper.Map<Skill>(command);
                await _unitOfWork.Repository<Skill>().AddAsync(skill);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(skill.Id, "Skill Saved");
            }
            else
            {
                var skill = await _unitOfWork.Repository<Skill>().GetByIdAsync(command.Id);
                if (skill != null)
                {
                    skill.Name = command.Name ?? skill.Name;
                    await _unitOfWork.Repository<Skill>().UpdateAsync(skill);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(skill.Id, "Skill Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Skill Not Found!");
                }
            }
        }
    }
}
