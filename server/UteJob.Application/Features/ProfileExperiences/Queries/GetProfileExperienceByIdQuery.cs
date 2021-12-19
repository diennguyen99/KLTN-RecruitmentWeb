using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileExperiences.Queries
{
    public class GetProfileExperienceByIdQuery : IRequest<Result<ProfileExperienceResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetProfileExperienceByIdQueryHandler : IRequestHandler<GetProfileExperienceByIdQuery, Result<ProfileExperienceResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetProfileExperienceByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<ProfileExperienceResponse>> Handle(GetProfileExperienceByIdQuery query, CancellationToken cancellationToken)
        {
            var profileExperience = await _unitOfWork.Repository<ProfileExperience>().GetByIdAsync(query.Id);
            var mappedProfileExperience = _mapper.Map<ProfileExperienceResponse>(profileExperience);
            return await Result<ProfileExperienceResponse>.SuccessAsync(mappedProfileExperience);
        }
    }
}
