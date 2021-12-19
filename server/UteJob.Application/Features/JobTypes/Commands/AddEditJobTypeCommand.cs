using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTypes.Commands
{
    public class AddEditJobTypeCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }

    internal class AddEditJobTypeCommandHandler : IRequestHandler<AddEditJobTypeCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditJobTypeCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditJobTypeCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var jobType = _mapper.Map<JobType>(command);
                await _unitOfWork.Repository<JobType>().AddAsync(jobType);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(jobType.Id, "Job Type Saved");
            }
            else
            {
                var jobType = await _unitOfWork.Repository<JobType>().GetByIdAsync(command.Id);
                if (jobType != null)
                {
                    jobType.Name = command.Name ?? jobType.Name;
                    await _unitOfWork.Repository<JobType>().UpdateAsync(jobType);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(jobType.Id, "Job Type Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Job Type Not Found!");
                }
            }
        }
    }
}
