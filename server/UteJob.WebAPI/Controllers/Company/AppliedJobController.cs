using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Features.AppliedJobs.Commands;
using UteJob.Application.Features.AppliedJobs.Queries;

namespace UteJob.WebAPI.Controllers.Company
{
    [Authorize]
    public class AppliedJobController : ApiControllerBase
    {
        [HttpGet("GetAppliedJobOfCandidate")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            var appliedJobs = await _mediator.Send(new GetAllPagedAppliedJobOfCandidateQuery(pageNumber, pageSize));
            return Ok(appliedJobs);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEditAppliedJobCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
