using MediatR;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Extensions;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Specifications;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Languages.Queries.GetAllPaged
{
    public class GetAllPagedLanguagesQuery : IRequest<PaginatedResult<GetAllPagedLanguagesResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString { get; set; }
        public string[] OrderBy { get; set; }

        public GetAllPagedLanguagesQuery(int pageNumber, int pageSize, string searchString, string orderBy)
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

    internal class GetAllPagedLanguagesQueryHandler : IRequestHandler<GetAllPagedLanguagesQuery, PaginatedResult<GetAllPagedLanguagesResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedLanguagesQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<GetAllPagedLanguagesResponse>> Handle(GetAllPagedLanguagesQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Language, GetAllPagedLanguagesResponse>> expression = e => new GetAllPagedLanguagesResponse
            {
                Id = e.Id,
                Name = e.Name
            };

            var languageFilterSpec = new LanguageFilterSpecification(request.SearchString);
            if (request.OrderBy?.Any() != true)
            {
                var data = await _unitOfWork.Repository<Language>().Entities
                   .Specify(languageFilterSpec)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
            else
            {
                var ordering = string.Join(",", request.OrderBy);
                var data = await _unitOfWork.Repository<Language>().Entities
                   .Specify(languageFilterSpec)
                   .OrderBy(ordering)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
        }
    }
}
