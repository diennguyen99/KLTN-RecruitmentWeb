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

namespace UteJob.Application.Features.Tags.Queries
{
    public class GetAllPagedTagsQuery : IRequest<PaginatedResult<Tag>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString { get; set; }
        public string[] OrderBy { get; set; }

        public GetAllPagedTagsQuery(int pageNumber, int pageSize, string searchString, string orderBy)
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

    internal class GetAllPagedTagsQueryHandler : IRequestHandler<GetAllPagedTagsQuery, PaginatedResult<Tag>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedTagsQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<Tag>> Handle(GetAllPagedTagsQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Tag, Tag>> expression = e => new Tag
            {
                Id = e.Id,
                Name = e.Name,
                Slug = e.Slug
            };

            var tagFilterSpec = new TagFilterSpecification(request.SearchString);
            if (request.OrderBy?.Any() != true)
            {
                var data = await _unitOfWork.Repository<Tag>().Entities
                   .Specify(tagFilterSpec)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
            else
            {
                var ordering = string.Join(",", request.OrderBy);
                var data = await _unitOfWork.Repository<Tag>().Entities
                   .Specify(tagFilterSpec)
                   .OrderBy(ordering)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
        }
    }
}
