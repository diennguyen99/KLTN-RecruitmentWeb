using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Interfaces.Services.Identity;
using UteJob.Application.Requests.Identity;

namespace UteJob.WebAPI.Controllers.Identity
{
    public class TokenController: ApiControllerBase
    {
        private readonly ITokenService _identityService;

        public TokenController(ITokenService identityService, ICurrentUserService currentUserService)
        {
            _identityService = identityService;
        }

        [HttpPost]
        public async Task<ActionResult> Get(TokenRequest model)
        {
            var response = await _identityService.LoginAsync(model);
            return Ok(response);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult> Refresh([FromBody] RefreshTokenRequest model)
        {
            var response = await _identityService.GetRefreshTokenAsync(model);
            return Ok(response);
        }
    }
}
