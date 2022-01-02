using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTags.Commands
{
    public class AddEditJobTagCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        public int JobId { get; set; }

        public int TagId { get; set; }
    }

    internal class AddEditJobTagCommandHandler : IRequestHandler<AddEditJobTagCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditJobTagCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(AddEditJobTagCommand command, CancellationToken cancellationToken)
        {
            var tag = await _unitOfWork.Repository<Tag>().GetByIdAsync(command.TagId);
            if (tag == null)
            {
                return await Result<int>.FailAsync("Tag Not Found!");
            }
            var job = await _unitOfWork.Repository<Job>().GetByIdAsync(command.JobId);
            if (job == null)
            {
                return await Result<int>.FailAsync("Job Not Found!");
            }

            if (command.Id == 0)
            {
                var jobTag = new JobTag
                {
                    Id = 0,
                    TagId = command.TagId,
                    Tag = tag,
                    JobId = command.JobId,
                    Job = job
                };

                await _unitOfWork.Repository<JobTag>().AddAsync(jobTag);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(jobTag.Id, "Job Tag Saved");
            }
            else
            {
                var jobTag = await _unitOfWork.Repository<JobTag>().GetByIdAsync(command.Id);
                if (jobTag != null)
                {
                    jobTag.TagId = tag.Id;
                    jobTag.Tag = tag ?? jobTag.Tag;
                    jobTag.JobId = job.Id;
                    jobTag.Job = job ?? jobTag.Job;

                    await _unitOfWork.Repository<JobTag>().UpdateAsync(jobTag);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(jobTag.Id, "Job Tag Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Job Tag Not Found!");
                }
            }
        }
    }
}
