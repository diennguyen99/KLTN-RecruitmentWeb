using AutoMapper;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileSummarys.Commands
{
    public class AddEditProfileSummaryCommand : IRequest<Result<ProfileSummary>>
    {
        public int Id { get; set; }

        [Required]
        public string Summary { get; set; }
    }

    internal class AddEditProfileSummaryCommandHandler : IRequestHandler<AddEditProfileSummaryCommand, Result<ProfileSummary>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditProfileSummaryCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<ProfileSummary>> Handle(AddEditProfileSummaryCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var profileSummary = _mapper.Map<ProfileSummary>(command);
                await _unitOfWork.Repository<ProfileSummary>().AddAsync(profileSummary);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<ProfileSummary>.SuccessAsync(profileSummary, "Profile Summary Saved");
            }
            else
            {
                var profileSummary = await _unitOfWork.Repository<ProfileSummary>().GetByIdAsync(command.Id);
                if (profileSummary != null)
                {
                    profileSummary.Summary = command.Summary ?? profileSummary.Summary;
                    await _unitOfWork.Repository<ProfileSummary>().UpdateAsync(profileSummary);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<ProfileSummary>.SuccessAsync(profileSummary, "Profile Summary Updated");
                }
                else
                {
                    return await Result<ProfileSummary>.FailAsync("Profile Summary Not Found!");
                }
            }
        }
    }
}
