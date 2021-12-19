using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;
using UteJob.Application.Features.ProfileProjects.Commands;
using UteJob.Application.Features.ProfileProjects.Queries.GetAll;
using UteJob.Application.Features.ProfileProjects.Queries.GetById;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class ProfileProjectController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobTypes = await _mediator.Send(new GetAllProfileProjectsQuery());
            return Ok(jobTypes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var jobType = await _mediator.Send(new GetProfileProjectByIdQuery() { Id = id });
            return Ok(jobType);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] AddEditProfileProjectCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteProfileProjectCommand { Id = id }));
        }
    }
}
