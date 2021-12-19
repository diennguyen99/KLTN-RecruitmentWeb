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

namespace UteJob.Application.Features.Languages.Queries.GetById
{
    public class GetLanguageByIdQuery : IRequest<Result<GetLanguageByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetLanguageByIdQueryHandler : IRequestHandler<GetLanguageByIdQuery, Result<GetLanguageByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetLanguageByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetLanguageByIdResponse>> Handle(GetLanguageByIdQuery query, CancellationToken cancellationToken)
        {
            var language = await _unitOfWork.Repository<Language>().GetByIdAsync(query.Id);
            var mappedLanguage = _mapper.Map<GetLanguageByIdResponse>(language);
            return await Result<GetLanguageByIdResponse>.SuccessAsync(mappedLanguage);
        }
    }
}
