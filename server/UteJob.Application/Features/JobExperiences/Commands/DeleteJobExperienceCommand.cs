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

namespace UteJob.Application.Features.JobExperiences.Commands
{
    public class DeleteJobExperienceCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteJobExperienceCommandHandler : IRequestHandler<DeleteJobExperienceCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteJobExperienceCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteJobExperienceCommand command, CancellationToken cancellationToken)
        {
            var jobExperience = await _unitOfWork.Repository<JobExperience>().GetByIdAsync(command.Id);
            if (jobExperience != null)
            {
                await _unitOfWork.Repository<JobExperience>().DeleteAsync(jobExperience);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(jobExperience.Id, "Job Experience Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Job Experience Not Found!");
            }
        }
    }
}
