using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Features.Companies.Commands;
using UteJob.Application.Features.Companies.Queries;

namespace UteJob.WebAPI.Controllers.Company
{
    [Authorize]
    public class CompanyController : ApiControllerBase
    {
        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var company = await _mediator.Send(new GetCompanyBySlugQuery() { Slug = slug });
            return Ok(company);
        }

        [HttpGet("GetMyEmployer")]
        public async Task<IActionResult> GetMyEmployer()
        {
            var company = await _mediator.Send(new GetCompanyByEmployerQuery());
            return Ok(company);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string searchString, string orderBy = null)
        {
            var companies = await _mediator.Send(new GetAllPagedCompaniesQuery(pageNumber, pageSize, searchString, orderBy));
            return Ok(companies);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] AddEditCompanyCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
