using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Companies.Queries
{
    public class GetCompanyByEmployerQuery : IRequest<Result<CompanyResponse>>
    {
        public GetCompanyByEmployerQuery() { }
    }

    internal class GetCompanyByEmployerQueryHandler : IRequestHandler<GetCompanyByEmployerQuery, Result<CompanyResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetCompanyByEmployerQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<CompanyResponse>> Handle(GetCompanyByEmployerQuery query, CancellationToken cancellationToken)
        {
            var company = await _unitOfWork.Repository<Company>()
                .Entities
                .FirstOrDefaultAsync(c => c.CreatedBy == _currentUserService.UserId);
            var mappedCompany = _mapper.Map<CompanyResponse>(company);
            return await Result<CompanyResponse>.SuccessAsync(mappedCompany);
        }
    }
}
