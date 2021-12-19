using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.Jobs.Commands;
using UteJob.Application.Features.Jobs.Queries;

namespace UteJob.WebAPI.Controllers.Company
{
    [Authorize]
    public class JobController : ApiControllerBase
    {
        [HttpGet("GetJobApplied")]
        public async Task<IActionResult> GetJobApplied(string slug)
        {
            var job = await _mediator.Send(new GetJobAppliedQuery() { Slug = slug });
            return Ok(job);
        }

        [HttpGet()]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string searchString, string orderBy = null)
        {
            var jobs = await _mediator.Send(new GetAllPagedJobsQuery(pageNumber, pageSize, searchString, orderBy));
            return Ok(jobs);
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var job = await _mediator.Send(new GetJobBySlugQuery() { Slug = slug });
            return Ok(job);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditJobCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteJobCommand { Id = id }));
        }
    }
}
