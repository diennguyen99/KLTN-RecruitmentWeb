using AutoMapper;
using MediatR;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileEducations.Commands
{
    public class AddEditProfileEducationCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string SchoolName { get; set; }

        [Required]
        public string MajorsName { get; set; }

        public bool? IsPresent { get; set; }

        public DateTime? DateStart { get; set; }

        public DateTime? DateEnd { get; set; }
    }

    internal class AddEditProfileEducationCommandHandler : IRequestHandler<AddEditProfileEducationCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditProfileEducationCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditProfileEducationCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var profileEducation = _mapper.Map<ProfileEducation>(command);
                await _unitOfWork.Repository<ProfileEducation>().AddAsync(profileEducation);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileEducation.Id, "Profile Education Saved");
            }
            else
            {
                var profileEducation = await _unitOfWork.Repository<ProfileEducation>().GetByIdAsync(command.Id);
                if (profileEducation != null)
                {
                    profileEducation.SchoolName = command.SchoolName ?? profileEducation.SchoolName;
                    profileEducation.MajorsName = command.MajorsName ?? profileEducation.MajorsName;
                    profileEducation.IsPresent = command.IsPresent ?? profileEducation.IsPresent;
                    profileEducation.DateStart = command.DateStart ?? profileEducation.DateStart;
                    profileEducation.DateEnd = command.DateEnd ?? profileEducation.DateEnd;
                    await _unitOfWork.Repository<ProfileEducation>().UpdateAsync(profileEducation);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(profileEducation.Id, "Profile Education Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Profile Education Not Found!");
                }
            }
        }
    }
}
