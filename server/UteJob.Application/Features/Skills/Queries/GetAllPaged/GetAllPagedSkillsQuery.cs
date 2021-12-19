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

namespace UteJob.Application.Features.Skills.Queries.GetAllPaged
{
    public class GetAllPagedSkillsQuery : IRequest<PaginatedResult<GetAllPagedSkillsResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString { get; set; }
        public string[] OrderBy { get; set; }

        public GetAllPagedSkillsQuery(int pageNumber, int pageSize, string searchString, string orderBy)
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
    internal class GetAllPagedSkillsQueryHandler : IRequestHandler<GetAllPagedSkillsQuery, PaginatedResult<GetAllPagedSkillsResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllPagedSkillsQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedResult<GetAllPagedSkillsResponse>> Handle(GetAllPagedSkillsQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Skill, GetAllPagedSkillsResponse>> expression = e => new GetAllPagedSkillsResponse
            {
                Id = e.Id,
                Name = e.Name
            };

            var skillFilterSpec = new SkillFilterSpecification(request.SearchString);
            if (request.OrderBy?.Any() != true)
            {
                var data = await _unitOfWork.Repository<Skill>().Entities
                   .Specify(skillFilterSpec)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
            else
            {
                var ordering = string.Join(",", request.OrderBy);
                var data = await _unitOfWork.Repository<Skill>().Entities
                   .Specify(skillFilterSpec)
                   .OrderBy(ordering)
                   .Select(expression)
                   .ToPaginatedListAsync(request.PageNumber, request.PageSize);
                return data;
            }
        }
    }
}
