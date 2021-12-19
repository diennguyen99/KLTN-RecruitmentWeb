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

namespace UteJob.Application.Features.Jobs.Queries
{
    public class GetJobBySlugQuery : IRequest<Result<Job>>
    {
        public string Slug { get; set; }
    }

    internal class GetJobBySlugQueryHandler : IRequestHandler<GetJobBySlugQuery, Result<Job>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetJobBySlugQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Job>> Handle(GetJobBySlugQuery query, CancellationToken cancellationToken)
        {
            var job = await _unitOfWork.Repository<Job>()
                .Entities
                .Include(j => j.Company)
                .Include(j => j.City)
                .Include(j => j.JobType)
                .Include(j => j.JobExperience)
                .FirstOrDefaultAsync(c => c.Slug == query.Slug);
            return await Result<Job>.SuccessAsync(job);
        }
    }
}
