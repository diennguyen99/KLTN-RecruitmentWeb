using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileSummarys.Queries
{
    public class GetProfileSummaryQuery : IRequest<Result<ProfileSummaryResponse>>
    {
        public GetProfileSummaryQuery()
        {
        }
    }

    internal class GetProfileSummaryQueryHandler : IRequestHandler<GetProfileSummaryQuery, Result<ProfileSummaryResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetProfileSummaryQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<ProfileSummaryResponse>> Handle(GetProfileSummaryQuery request, CancellationToken cancellationToken)
        {
            var profileSummary = await _unitOfWork.Repository<ProfileSummary>()
                .Entities
                .FirstOrDefaultAsync(p => p.CreatedBy == _currentUserService.UserId);

            if (profileSummary == null)
            {
                return await Result<ProfileSummaryResponse>.SuccessAsync();
            }

            var mappedProfileSummary = _mapper.Map<ProfileSummaryResponse>(profileSummary);
            return await Result<ProfileSummaryResponse>.SuccessAsync(mappedProfileSummary);
        }
    }
}
