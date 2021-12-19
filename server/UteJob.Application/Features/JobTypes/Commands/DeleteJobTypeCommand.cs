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

namespace UteJob.Application.Features.JobTypes.Commands
{
    public class DeleteJobTypeCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteJobTypeCommandHandler : IRequestHandler<DeleteJobTypeCommand, Result<int>>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteJobTypeCommandHandler(IUnitOfWork<int> unitOfWork, IJobRepository jobRepository)
        {
            _unitOfWork = unitOfWork;
            _jobRepository = jobRepository;
        }

        public async Task<Result<int>> Handle(DeleteJobTypeCommand command, CancellationToken cancellationToken)
        {
            var isJobTypeUsed = await _jobRepository.IsJobTypeUsed(command.Id);
            if (!isJobTypeUsed)
            {
                var jobType = await _unitOfWork.Repository<JobType>().GetByIdAsync(command.Id);
                if (jobType != null)
                {
                    await _unitOfWork.Repository<JobType>().DeleteAsync(jobType);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(jobType.Id, "Job Type Deleted");
                }
                else
                {
                    return await Result<int>.FailAsync("Job Type Not Found!");
                }
            }
            else
            {
                return await Result<int>.FailAsync("Deletion Not Allowed");
            }
        }
    }
}
