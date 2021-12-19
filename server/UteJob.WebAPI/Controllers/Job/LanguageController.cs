using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.Languages.Commands;
using UteJob.Application.Features.Languages.Queries.GetAllPaged;
using UteJob.Application.Features.Languages.Queries.GetById;

namespace UteJob.WebAPI.Controllers.Job
{
    [Authorize]
    public class LanguageController : ApiControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string searchString, string orderBy = null)
        {
            var languages = await _mediator.Send(new GetAllPagedLanguagesQuery(pageNumber, pageSize, searchString, orderBy));
            return Ok(languages);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var language = await _mediator.Send(new GetLanguageByIdQuery() { Id = id });
            return Ok(language);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditLanguageCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteLanguageCommand { Id = id }));
        }
    }
}
