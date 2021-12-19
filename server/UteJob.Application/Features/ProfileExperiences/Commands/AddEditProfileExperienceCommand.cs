using AutoMapper;
using MediatR;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileExperiences.Commands
{
    public class AddEditProfileExperienceCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string Description { get; set; }

        public bool? IsPresent { get; set; }

        [Required]
        public DateTime? DateStart { get; set; }

        public DateTime? DateEnd { get; set; }
    }

    internal class AddEditProfileExperienceCommandHandler : IRequestHandler<AddEditProfileExperienceCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditProfileExperienceCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditProfileExperienceCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var profileExperience = _mapper.Map<ProfileExperience>(command);
                await _unitOfWork.Repository<ProfileExperience>().AddAsync(profileExperience);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileExperience.Id, "Profile Experience Saved");
            }
            else
            {
                var profileExperience = await _unitOfWork.Repository<ProfileExperience>().GetByIdAsync(command.Id);
                if (profileExperience != null)
                {
                    profileExperience.Position = command.Position ?? profileExperience.Position;
                    profileExperience.CompanyName = command.CompanyName ?? profileExperience.CompanyName;
                    profileExperience.Description = command.Description ?? profileExperience.Description;
                    profileExperience.IsPresent = command.IsPresent ?? profileExperience.IsPresent;
                    profileExperience.DateStart = command.DateStart ?? profileExperience.DateStart;
                    profileExperience.DateEnd = command.DateEnd ?? profileExperience.DateEnd;
                    await _unitOfWork.Repository<ProfileExperience>().UpdateAsync(profileExperience);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(profileExperience.Id, "Profile Experience Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Profile Experience Not Found!");
                }
            }
        }
    }
}
