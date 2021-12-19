using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Extensions;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Specifications;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Companies.Queries
{
    public class GetAllPagedCompaniesQuery : IRequest<PaginatedResult<CompanyResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString { get; set; }
        public string[] OrderBy { get; set; }

        public GetAllPagedCompaniesQuery(int pageNumber, int pageSize, string searchString, string orderBy)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            SearchString = searchString;
            if (!string.IsNullOrWhiteSpace(orderBy))
            {
                OrderBy = orderBy.Split(',');
            }
        }
    }

    internal class GetAllPagedCompaniesQueryHandler : IRequestHandler<GetAllPagedCompaniesQuery, PaginatedResult<CompanyResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedCompaniesQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<CompanyResponse>> Handle(GetAllPagedCompaniesQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Company, CompanyResponse>> expression = e => new CompanyResponse
            {
                Id = e.Id,
                Name = e.Name,
                Slug = e.Slug,
                Logo = e.Logo
            };

            var compantFilterSpec = new CompanyFilterSpecification(request.SearchString);
            if (request.OrderBy?.Any() != true)
            {
                var data = await _unitOfWork.Repository<Company>().Entities
                   .Specify(compantFilterSpec)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
            else
            {
                var ordering = string.Join(",", request.OrderBy);
                var data = await _unitOfWork.Repository<Company>().Entities
                   .Specify(compantFilterSpec)
                   .OrderBy(ordering)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
        }
    }
}
