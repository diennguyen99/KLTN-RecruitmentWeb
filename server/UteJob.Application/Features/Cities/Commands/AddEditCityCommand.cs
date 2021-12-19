using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Cities.Commands
{
    public class AddEditCityCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Slug { get; set; }

        public bool IsShowSearch { get; set; }
    }

    internal class AddEditCityCommandHandler : IRequestHandler<AddEditCityCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditCityCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditCityCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var city = _mapper.Map<City>(command);
                await _unitOfWork.Repository<City>().AddAsync(city);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(city.Id, "City Saved");
            } else
            {
                var city = await _unitOfWork.Repository<City>().GetByIdAsync(command.Id);
                if (city != null)
                {
                    city.Name = command.Name ?? city.Name;
                    city.Slug = command.Slug ?? city.Slug;
                    city.IsShowSearch = command.IsShowSearch;
                    await _unitOfWork.Repository<City>().UpdateAsync(city);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(city.Id, "City Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("City Not Found!");
                }
            }
        }
    }
}
