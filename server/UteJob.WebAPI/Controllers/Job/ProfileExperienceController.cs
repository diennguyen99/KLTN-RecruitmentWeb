using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.ProfileExperiences.Commands;
using UteJob.Application.Features.ProfileExperiences.Queries;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class ProfileExperienceController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobTypes = await _mediator.Send(new GetAllProfileExperiencesQuery());
            return Ok(jobTypes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var jobType = await _mediator.Send(new GetProfileExperienceByIdQuery() { Id = id });
            return Ok(jobType);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditProfileExperienceCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteProfileExperienceCommand { Id = id }));
        }
    }
}
