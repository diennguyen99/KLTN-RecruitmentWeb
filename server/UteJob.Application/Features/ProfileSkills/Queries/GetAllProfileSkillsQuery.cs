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

namespace UteJob.Application.Features.ProfileSkills.Queries
{
    public class GetAllProfileSkillsQuery : IRequest<Result<List<ProfileSkillResponse>>>
    {
        public GetAllProfileSkillsQuery()
        {
        }
    }

    internal class GetAllProfileSkillsQueryHandler : IRequestHandler<GetAllProfileSkillsQuery, Result<List<ProfileSkillResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllProfileSkillsQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<ProfileSkillResponse>>> Handle(GetAllProfileSkillsQuery request, CancellationToken cancellationToken)
        {
            var profileSkills = await _unitOfWork.Repository<ProfileSkill>()
                .Entities
                .Where(p => p.CreatedBy == _currentUserService.UserId)
                .Include(p => p.Skill)
                .ToListAsync();
            var mappedProfileSkills = _mapper.Map<List<ProfileSkillResponse>>(profileSkills);
            return await Result<List<ProfileSkillResponse>>.SuccessAsync(mappedProfileSkills);
        }
    }
}
