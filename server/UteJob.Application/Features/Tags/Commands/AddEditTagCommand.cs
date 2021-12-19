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

namespace UteJob.Application.Features.Tags.Commands
{
    public class AddEditTagCommand : IRequest<Result<Tag>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Slug { get; set; }
    }

    internal class AddEditTagCommandHandler : IRequestHandler<AddEditTagCommand, Result<Tag>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditTagCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<Tag>> Handle(AddEditTagCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var tag = _mapper.Map<Tag>(command);
                await _unitOfWork.Repository<Tag>().AddAsync(tag);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<Tag>.SuccessAsync(tag, "Tag Saved");
            }
            else
            {
                var tag = await _unitOfWork.Repository<Tag>().GetByIdAsync(command.Id);
                if (tag != null)
                {
                    tag.Name = command.Name ?? tag.Name;
                    tag.Name = command.Slug ?? tag.Slug;
                    await _unitOfWork.Repository<Tag>().UpdateAsync(tag);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<Tag>.SuccessAsync(tag, "Tag Updated");
                }
                else
                {
                    return await Result<Tag>.FailAsync("Tag Not Found!");
                }
            }
        }
    }
}
