using AutoMapper;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Languages.Commands
{
    public class AddEditLanguageCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }

    internal class AddEditLanguageCommandHandler : IRequestHandler<AddEditLanguageCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditLanguageCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditLanguageCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var language = _mapper.Map<Language>(command);
                await _unitOfWork.Repository<Language>().AddAsync(language);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(language.Id, "Language Saved");
            }
            else
            {
                var language = await _unitOfWork.Repository<Language>().GetByIdAsync(command.Id);
                if (language != null)
                {
                    language.Name = command.Name ?? language.Name;
                    await _unitOfWork.Repository<Language>().UpdateAsync(language);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(language.Id, "Language Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Language Not Found!");
                }
            }
        }
    }
}
