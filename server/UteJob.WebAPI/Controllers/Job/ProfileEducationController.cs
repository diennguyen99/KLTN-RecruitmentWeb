using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.ProfileEducations.Commands;
using UteJob.Application.Features.ProfileEducations.Queries;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class ProfileEducationController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobTypes = await _mediator.Send(new GetAllProfileEducationsQuery());
            return Ok(jobTypes);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditProfileEducationCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteProfileEducationCommand { Id = id }));
        }
    }
}
