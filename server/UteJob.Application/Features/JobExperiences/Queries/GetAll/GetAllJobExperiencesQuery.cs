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

namespace UteJob.Application.Features.JobExperiences.Queries.GetAll
{
    public class GetAllJobExperiencesQuery : IRequest<Result<List<GetAllJobExperiencesResponse>>>
    {
        public GetAllJobExperiencesQuery()
        {
        }
    }

    internal class GetAllJobExperiencesQueryHandler : IRequestHandler<GetAllJobExperiencesQuery, Result<List<GetAllJobExperiencesResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllJobExperiencesQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<List<GetAllJobExperiencesResponse>>> Handle(GetAllJobExperiencesQuery request, CancellationToken cancellationToken)
        {
            var jobExperiences = await _unitOfWork.Repository<JobExperience>().GetAllAsync();
            var mappedJobExperiences = _mapper.Map<List<GetAllJobExperiencesResponse>>(jobExperiences);
            return await Result<List<GetAllJobExperiencesResponse>>.SuccessAsync(mappedJobExperiences);
        }
    }
}
