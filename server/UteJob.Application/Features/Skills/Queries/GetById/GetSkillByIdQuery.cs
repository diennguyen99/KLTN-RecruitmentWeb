using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Skills.Queries.GetById
{
    public class GetSkillByIdQuery : IRequest<Result<GetSkillByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetSkillByIdQueryHandler : IRequestHandler<GetSkillByIdQuery, Result<GetSkillByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetSkillByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetSkillByIdResponse>> Handle(GetSkillByIdQuery query, CancellationToken cancellationToken)
        {
            var skill = await _unitOfWork.Repository<Skill>().GetByIdAsync(query.Id);
            var mappedSkill = _mapper.Map<GetSkillByIdResponse>(skill);
            return await Result<GetSkillByIdResponse>.SuccessAsync(mappedSkill);
        }
    }
}
