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

namespace UteJob.Application.Features.AppliedJobs.Commands
{
    public class AddEditAppliedJobCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
        public bool MyCVOnline { get; set; }
        public int CVId { get; set; }
        public int JobId { get; set; }
        public string Description { get; set; }
    }

    internal class AddEditAppliedJobCommandHandler : IRequestHandler<AddEditAppliedJobCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditAppliedJobCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditAppliedJobCommand command, CancellationToken cancellationToken)
        {
            var job = await _unitOfWork.Repository<Job>().GetByIdAsync(command.JobId);
            if (job == null)
            {
                return await Result<int>.FailAsync("Job Not Found!");
            }

            CV cv = null;
            if (command.MyCVOnline == false && command.CVId != 0)
            {
                cv = await _unitOfWork.Repository<CV>().GetByIdAsync(command.CVId);
            }

            if (command.Id == 0)
            {
                var appliedJob = new AppliedJob
                {
                    Id = 0,
                    MyCVOnline = command.MyCVOnline,
                    CVId = command.MyCVOnline ? null : command.Id,
                    CV = cv,
                    JobId = command.JobId,
                    Job = job,
                    Description = command.Description
                };
                await _unitOfWork.Repository<AppliedJob>().AddAsync(appliedJob);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(appliedJob.Id, "Applied Job Saved");
            }
            else
            {
                var appliedJob = await _unitOfWork.Repository<AppliedJob>().GetByIdAsync(command.Id);
                if (appliedJob != null)
                {
                    appliedJob.MyCVOnline = command.MyCVOnline;
                    appliedJob.Description = command.Description ?? appliedJob.Description;
                    appliedJob.CVId = command.CVId;
                    appliedJob.CV = cv;
                    appliedJob.Job = job;
                    appliedJob.JobId = command.JobId;
                    await _unitOfWork.Repository<AppliedJob>().UpdateAsync(appliedJob);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(appliedJob.Id, "Applied Job Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Applied Job Not Found!");
                }
            }
        }
    }
}
