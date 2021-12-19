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

namespace UteJob.Application.Features.Tags.Queries
{
    public class GetAllTagsQuery : IRequest<Result<List<Tag>>>
    {
        public GetAllTagsQuery() { }
    }

    internal class GetAllTagsQueryHandler : IRequestHandler<GetAllTagsQuery, Result<List<Tag>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetAllTagsQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<List<Tag>>> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
        {
            var tags = await _unitOfWork.Repository<Tag>().GetAllAsync();
            return await Result<List<Tag>>.SuccessAsync(tags);
        }
    }
}
