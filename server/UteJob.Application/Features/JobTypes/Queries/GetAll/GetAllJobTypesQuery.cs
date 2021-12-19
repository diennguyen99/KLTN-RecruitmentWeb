using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTypes.Queries.GetAll
{
    public class GetAllJobTypesQuery : IRequest<Result<List<GetAllJobTypesResponse>>>
    {
        public GetAllJobTypesQuery()
        {
        }
    }

    internal class GetAllBrandsCachedQueryHandler : IRequestHandler<GetAllJobTypesQuery, Result<List<GetAllJobTypesResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllBrandsCachedQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<List<GetAllJobTypesResponse>>> Handle(GetAllJobTypesQuery request, CancellationToken cancellationToken)
        {
            var jobTypes = await _unitOfWork.Repository<JobType>().GetAllAsync();
            var mappedJobTypes = _mapper.Map<List<GetAllJobTypesResponse>>(jobTypes);
            return await Result<List<GetAllJobTypesResponse>>.SuccessAsync(mappedJobTypes);
        }
    }
}
