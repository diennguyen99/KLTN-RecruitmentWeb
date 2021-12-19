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

namespace UteJob.Application.Features.Cities.Queries.GetById
{
    public class GetCityByIdQuery : IRequest<Result<GetCityByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetCityByIdQueryHandler : IRequestHandler<GetCityByIdQuery, Result<GetCityByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetCityByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetCityByIdResponse>> Handle(GetCityByIdQuery query, CancellationToken cancellationToken)
        {
            var city = await _unitOfWork.Repository<City>().GetByIdAsync(query.Id);
            var mappedCity = _mapper.Map<GetCityByIdResponse>(city);
            return await Result<GetCityByIdResponse>.SuccessAsync(mappedCity);
        }
    }
}
