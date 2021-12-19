using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.ProfileSummarys.Commands;
using UteJob.Application.Features.ProfileSummarys.Queries;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class ProfileSummaryController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var profileSummary = await _mediator.Send(new GetProfileSummaryQuery());
            return Ok(profileSummary);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditProfileSummaryCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
