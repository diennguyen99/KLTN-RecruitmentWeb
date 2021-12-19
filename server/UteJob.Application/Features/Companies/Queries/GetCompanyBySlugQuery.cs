using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Companies.Queries
{
    public class GetCompanyBySlugQuery : IRequest<Result<CompanyResponse>>
    {
        public string Slug { get; set; }
    }

    internal class GetCompanyBySlugQueryHandler : IRequestHandler<GetCompanyBySlugQuery, Result<CompanyResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetCompanyBySlugQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<CompanyResponse>> Handle(GetCompanyBySlugQuery query, CancellationToken cancellationToken)
        {
            var company = await _unitOfWork.Repository<Company>()
                .Entities
                .Include(c => c.Jobs).ThenInclude(j => j.City)
                .Include(c => c.Jobs).ThenInclude(j => j.JobType)
                .Include(c => c.Jobs).ThenInclude(j => j.JobExperience)
                .FirstOrDefaultAsync(c => c.Slug == query.Slug);
            var mappedCompany = _mapper.Map<CompanyResponse>(company);
            return await Result<CompanyResponse>.SuccessAsync(mappedCompany);
        }
    }
}
