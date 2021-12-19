using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.JobExperiences.Commands;
using UteJob.Application.Features.JobExperiences.Queries.GetAll;
using UteJob.Application.Features.JobExperiences.Queries.GetById;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class JobExperienceController : ApiControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cities = await _mediator.Send(new GetAllJobExperiencesQuery());
            return Ok(cities);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var city = await _mediator.Send(new GetJobExperienceByIdQuery() { Id = id });
            return Ok(city);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditJobExperienceCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteJobExperienceCommand { Id = id }));
        }
    }
}
