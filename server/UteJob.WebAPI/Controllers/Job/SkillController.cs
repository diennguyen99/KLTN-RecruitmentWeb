using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.Skills.Commands;
using UteJob.Application.Features.Skills.Queries.GetAllPaged;
using UteJob.Application.Features.Skills.Queries.GetById;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class SkillController : ApiControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string searchString, string orderBy = null)
        {
            var cities = await _mediator.Send(new GetAllPagedSkillsQuery(pageNumber, pageSize, searchString, orderBy));
            return Ok(cities);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var city = await _mediator.Send(new GetSkillByIdQuery() { Id = id });
            return Ok(city);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditSkillCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteSkillCommand { Id = id }));
        }
    }
}
