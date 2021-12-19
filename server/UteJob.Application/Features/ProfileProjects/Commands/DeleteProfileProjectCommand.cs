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

namespace UteJob.Application.Features.ProfileProjects.Commands
{
    public class DeleteProfileProjectCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteProfileProjectCommandHanlder : IRequestHandler<DeleteProfileProjectCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteProfileProjectCommandHanlder(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteProfileProjectCommand command, CancellationToken cancellationToken)
        {
            var profileProject = await _unitOfWork.Repository<ProfileProject>().GetByIdAsync(command.Id);
            if (profileProject != null)
            {
                await _unitOfWork.Repository<ProfileProject>().DeleteAsync(profileProject);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(profileProject.Id, "Profile Project Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Profile Project Not Found!");
            }
        }
    }
}
