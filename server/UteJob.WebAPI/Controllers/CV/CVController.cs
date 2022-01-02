using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.CVs.Commands;
using UteJob.Application.Features.CVs.Queries;

namespace UteJob.WebAPI.Controllers.CV
{
    [Authorize]
    public class CVController : ApiControllerBase
    {
        [HttpGet("GetCVOnline")]
        public async Task<IActionResult> GetCVOnlineByUserId(string userId)
        {
            var cv = await _mediator.Send(new GetCVOnlineQuery { UserId = userId });
            return Ok(cv);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cvs = await _mediator.Send(new GetAllCVsQuery());
            return Ok(cvs);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] AddEditCVCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteCVCommand { Id = id }));
        }
    }
}
