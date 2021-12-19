using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileSkills.Queries
{
    public class GetProfileSkillByIdQuery : IRequest<Result<ProfileSkillResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetProfileSkillByIdQueryHandler : IRequestHandler<GetProfileSkillByIdQuery, Result<ProfileSkillResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetProfileSkillByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<ProfileSkillResponse>> Handle(GetProfileSkillByIdQuery query, CancellationToken cancellationToken)
        {
            var profileSkill = await _unitOfWork.Repository<ProfileSkill>().GetByIdAsync(query.Id);
            var mappedProfileSkill = _mapper.Map<ProfileSkillResponse>(profileSkill);
            return await Result<ProfileSkillResponse>.SuccessAsync(mappedProfileSkill);
        }
    }
}
