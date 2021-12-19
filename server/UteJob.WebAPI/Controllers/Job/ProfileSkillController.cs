using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.ProfileSkills.Commands;
using UteJob.Application.Features.ProfileSkills.Queries;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class ProfileSkillController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cities = await _mediator.Send(new GetAllProfileSkillsQuery());
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var city = await _mediator.Send(new GetProfileSkillByIdQuery() { Id = id });
            return Ok(city);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditProfileSkillCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteProfileSkillCommand { Id = id }));
        }
    }
}
