using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.Tags.Commands;
using UteJob.Application.Features.Tags.Queries;

namespace UteJob.WebAPI.Controllers.Company
{
    [Authorize]
    public class TagController : ApiControllerBase
    {
        [HttpGet("GetPagedAll")]
        public async Task<IActionResult> GetPagedAll(int pageNumber, int pageSize, string searchString, string orderBy = null)
        {
            var tags = await _mediator.Send(new GetAllPagedTagsQuery(pageNumber, pageSize, searchString, orderBy));
            return Ok(tags);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tags = await _mediator.Send(new GetAllTagsQuery());
            return Ok(tags);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditTagCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteTagCommand { Id = id }));
        }
    }
}
