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

namespace UteJob.Application.Features.JobTypes.Queries.GetById
{
    public class GetJobTypeByIdQuery : IRequest<Result<GetJobTypeByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetJobTypeByIdQueryHandler : IRequestHandler<GetJobTypeByIdQuery, Result<GetJobTypeByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetJobTypeByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetJobTypeByIdResponse>> Handle(GetJobTypeByIdQuery query, CancellationToken cancellationToken)
        {
            var jobType = await _unitOfWork.Repository<JobType>().GetByIdAsync(query.Id);
            var mappedJobType = _mapper.Map<GetJobTypeByIdResponse>(jobType);
            return await Result<GetJobTypeByIdResponse>.SuccessAsync(mappedJobType);
        }
    }
}
