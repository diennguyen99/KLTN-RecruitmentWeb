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

namespace UteJob.Application.Features.JobExperiences.Commands
{
    public class AddEditJobExperienceCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }

    internal class AddEditJobExperienceCommandHandler : IRequestHandler<AddEditJobExperienceCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditJobExperienceCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditJobExperienceCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var jobExperience = _mapper.Map<JobExperience>(command);
                await _unitOfWork.Repository<JobExperience>().AddAsync(jobExperience);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(jobExperience.Id, "Job Experience Saved");
            }
            else
            {
                var jobExperience = await _unitOfWork.Repository<JobExperience>().GetByIdAsync(command.Id);
                if (jobExperience != null)
                {
                    jobExperience.Name = command.Name ?? jobExperience.Name;
                    await _unitOfWork.Repository<JobExperience>().UpdateAsync(jobExperience);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(jobExperience.Id, "Job Experience Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Job Experience Not Found!");
                }
            }
        }
    }
}
