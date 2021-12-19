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

namespace UteJob.Application.Features.JobExperiences.Queries.GetById
{
    public class GetJobExperienceByIdQuery : IRequest<Result<GetJobExperienceByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetJobExperienceByIdQueryHandler : IRequestHandler<GetJobExperienceByIdQuery, Result<GetJobExperienceByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetJobExperienceByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetJobExperienceByIdResponse>> Handle(GetJobExperienceByIdQuery query, CancellationToken cancellationToken)
        {
            var jobExperience = await _unitOfWork.Repository<JobExperience>().GetByIdAsync(query.Id);
            var mappedJobExperience = _mapper.Map<GetJobExperienceByIdResponse>(jobExperience);
            return await Result<GetJobExperienceByIdResponse>.SuccessAsync(mappedJobExperience);
        }
    }
}
