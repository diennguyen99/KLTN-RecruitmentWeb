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

namespace UteJob.Application.Features.ProfileProjects.Queries.GetById
{
    public class GetProfileProjectByIdQuery : IRequest<Result<GetProfileProjectByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetProfileProjectByIdQueryHandler : IRequestHandler<GetProfileProjectByIdQuery, Result<GetProfileProjectByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetProfileProjectByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetProfileProjectByIdResponse>> Handle(GetProfileProjectByIdQuery query, CancellationToken cancellationToken)
        {
            var profileProject = await _unitOfWork.Repository<ProfileProject>().GetByIdAsync(query.Id);
            var mappedProfileProject = _mapper.Map<GetProfileProjectByIdResponse>(profileProject);
            return await Result<GetProfileProjectByIdResponse>.SuccessAsync(mappedProfileProject);
        }
    }
}
