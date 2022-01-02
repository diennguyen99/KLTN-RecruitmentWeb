using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTags.Queries
{
    public class GetAllTagByJobIdQuery : IRequest<Result<List<JobTag>>>
    {
        public int JobId { get; set; }
    }

    internal class GetAllTagByJobIdQueryHandler : IRequestHandler<GetAllTagByJobIdQuery, Result<List<JobTag>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllTagByJobIdQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<List<JobTag>>> Handle(GetAllTagByJobIdQuery request, CancellationToken cancellationToken)
        {
            var jobTags = _unitOfWork.Repository<JobTag>()
                                .Entities
                                .Include(j => j.Tag)
                                .Where(j => j.JobId == request.JobId)
                                .ToList();

            return await Result<List<JobTag>>.SuccessAsync(jobTags);
        }
    }
}
