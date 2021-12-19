using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.JobTypes.Commands;
using UteJob.Application.Features.JobTypes.Queries.GetAll;
using UteJob.Application.Features.JobTypes.Queries.GetById;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class JobTypeController : ApiControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobTypes = await _mediator.Send(new GetAllJobTypesQuery());
            return Ok(jobTypes);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var jobType = await _mediator.Send(new GetJobTypeByIdQuery() { Id = id });
            return Ok(jobType);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditJobTypeCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteJobTypeCommand { Id = id }));
        }
    }
}
