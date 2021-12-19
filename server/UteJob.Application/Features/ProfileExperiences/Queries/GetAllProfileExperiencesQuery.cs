using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileExperiences.Queries
{
    public class GetAllProfileExperiencesQuery : IRequest<Result<List<ProfileExperienceResponse>>>
    {
        public GetAllProfileExperiencesQuery()
        {

        }
    }

    internal class GetAllProfileExperiencesQueryHandler : IRequestHandler<GetAllProfileExperiencesQuery, Result<List<ProfileExperienceResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllProfileExperiencesQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<ProfileExperienceResponse>>> Handle(GetAllProfileExperiencesQuery request, CancellationToken cancellationToken)
        {
            var profileExperiences = await _unitOfWork.Repository<ProfileExperience>()
                .Entities
                .Where(p => p.CreatedBy == _currentUserService.UserId)
                .ToListAsync();
            var mappedProfileExperiences = _mapper.Map<List<ProfileExperienceResponse>>(profileExperiences);
            return await Result<List<ProfileExperienceResponse>>.SuccessAsync(mappedProfileExperiences);
        }
    }
}
