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

namespace UteJob.Application.Features.ProfileSkills.Commands
{
    public class AddEditProfileSkillCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public int SkillId { get; set; }

        [Required]
        public int Scores { get; set; }
    }

    internal class AddEditProfileSkillCommandHandler : IRequestHandler<AddEditProfileSkillCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditProfileSkillCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditProfileSkillCommand command, CancellationToken cancellationToken)
        {
            var skill = await _unitOfWork.Repository<Skill>().GetByIdAsync(command.SkillId);
            if (skill == null)
            {
                return await Result<int>.FailAsync("Skill Not Found!");
            }

            if (command.Id == 0)
            {
                var profileSkill = new ProfileSkill
                {
                    Id = 0,
                    Scores = command.Scores,
                    SkillId = command.SkillId,
                    Skill = skill
                };
                await _unitOfWork.Repository<ProfileSkill>().AddAsync(profileSkill);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileSkill.Id, "Profile Skill Type Saved");
            }
            else
            {
                var profileSkill = await _unitOfWork.Repository<ProfileSkill>().GetByIdAsync(command.Id);
                if (profileSkill != null)
                {
                    profileSkill.Scores = command.Scores;
                    profileSkill.SkillId = command.SkillId;
                    profileSkill.Skill = skill;
                    await _unitOfWork.Repository<ProfileSkill>().UpdateAsync(profileSkill);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(profileSkill.Id, "Profile Skill Type Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Profile Skill Not Found!");
                }
            }
        }
    }
}
