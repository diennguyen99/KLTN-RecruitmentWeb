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

namespace UteJob.Application.Features.ProfileEducations.Queries
{
    public class GetAllProfileEducationsQuery : IRequest<Result<List<ProfileEducationResponse>>>
    {
        public GetAllProfileEducationsQuery()
        {
        }
    }

    internal class GetAllProfileEducationsQueryHandler : IRequestHandler<GetAllProfileEducationsQuery, Result<List<ProfileEducationResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllProfileEducationsQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<ProfileEducationResponse>>> Handle(GetAllProfileEducationsQuery request, CancellationToken cancellationToken)
        {
            var profileEducations= await _unitOfWork.Repository<ProfileEducation>()
                .Entities
                .Where(p => p.CreatedBy == _currentUserService.UserId)
                .ToListAsync();
            var mappedProfileEducations = _mapper.Map<List<ProfileEducationResponse>>(profileEducations);
            return await Result<List<ProfileEducationResponse>>.SuccessAsync(mappedProfileEducations);
        }
    }
}
