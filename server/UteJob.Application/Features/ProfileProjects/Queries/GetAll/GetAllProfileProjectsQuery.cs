using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileProjects.Queries.GetAll
{
    public class GetAllProfileProjectsQuery : IRequest<Result<List<GetAllProfileProjectsResponse>>>
    {
        public GetAllProfileProjectsQuery()
        {

        }
    }

    internal class GetAllProfileProjectsQueryHandler : IRequestHandler<GetAllProfileProjectsQuery, Result<List<GetAllProfileProjectsResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllProfileProjectsQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<GetAllProfileProjectsResponse>>> Handle(GetAllProfileProjectsQuery request, CancellationToken cancellationToken)
        {
            var profileProjects = await _unitOfWork.Repository<ProfileProject>()
                .Entities
                .Where(p => p.CreatedBy == _currentUserService.UserId)
                .ToListAsync();
            var mappedProfileProjects = _mapper.Map<List<GetAllProfileProjectsResponse>>(profileProjects);
            return await Result<List<GetAllProfileProjectsResponse>>.SuccessAsync(mappedProfileProjects);
        }
    }
}
