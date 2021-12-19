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

namespace UteJob.Application.Features.CVs.Queries
{
    public class GetAllCVsQuery : IRequest<Result<List<CVResponse>>>
    {
        public GetAllCVsQuery()
        {
        }
    }

    internal class GetAllCVsQueryHandler : IRequestHandler<GetAllCVsQuery, Result<List<CVResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetAllCVsQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<CVResponse>>> Handle(GetAllCVsQuery request, CancellationToken cancellationToken)
        {
            var cvs = await _unitOfWork.Repository<CV>()
                .Entities
                .Where(p => p.CreatedBy == _currentUserService.UserId)
                .ToListAsync();
            var mappedCVs = _mapper.Map<List<CVResponse>>(cvs);
            return await Result<List<CVResponse>>.SuccessAsync(mappedCVs);
        }
    }
}
