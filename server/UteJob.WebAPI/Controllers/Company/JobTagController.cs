using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.JobTags.Queries;

namespace UteJob.WebAPI.Controllers.Company
{
    [Authorize]
    public class JobTagController : ApiControllerBase
    {
        [HttpGet()]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string tag, string city, int jobTypeId, int jobExperienceId, string orderBy = null)
        {
            var jobTags = await _mediator.Send(new GetAllPagedJobTagsQuery(pageNumber, pageSize, tag, city, jobTypeId, jobExperienceId, orderBy));
            return Ok(jobTags);
        }
    }
}
