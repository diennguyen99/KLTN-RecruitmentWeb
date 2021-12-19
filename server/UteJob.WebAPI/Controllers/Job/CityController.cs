using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.Cities.Commands;
using UteJob.Application.Features.Cities.Queries.GetAllPaged;
using UteJob.Application.Features.Cities.Queries.GetById;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class CityController : ApiControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string searchString, string orderBy = null)
        {
            var cities = await _mediator.Send(new GetAllPagedCitiesQuery(pageNumber, pageSize, searchString, orderBy));
            return Ok(cities);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var city = await _mediator.Send(new GetCityByIdQuery() { Id = id });
            return Ok(city);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditCityCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteCityCommand { Id = id }));
        }
    }
}
