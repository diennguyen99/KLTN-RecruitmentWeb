using MediatR;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Languages.Commands
{
    public class DeleteLanguageCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    internal class DeleteLanguageCommandHandler : IRequestHandler<DeleteLanguageCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public DeleteLanguageCommandHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<int>> Handle(DeleteLanguageCommand command, CancellationToken cancellationToken)
        {
            var language = await _unitOfWork.Repository<Language>().GetByIdAsync(command.Id);
            if (language != null)
            {
                await _unitOfWork.Repository<Language>().DeleteAsync(language);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(language.Id, "Language Deleted");
            }
            else
            {
                return await Result<int>.FailAsync("Language Not Found!");
            }
        }
    }
}
