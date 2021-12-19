using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Interfaces.Services.Identity;
using UteJob.Application.Requests.Identity;

namespace UteJob.WebAPI.Controllers.Identity
{
    [Authorize]
    public class AccountController : ApiControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ICurrentUserService _currentUser;

        public AccountController(IAccountService accountService, ICurrentUserService currentUser)
        {
            _accountService = accountService;
            _currentUser = currentUser;
        }

        [HttpGet(nameof(GetProfile))]
        public async Task<ActionResult> GetProfile()
        {
            var response = await _accountService.GetProfileAsync(_currentUser.UserId);
            return Ok(response);
        }

        [HttpPut(nameof(UpdateProfile))]
        public async Task<ActionResult> UpdateProfile(UpdateProfileRequest model)
        {
            var response = await _accountService.UpdateProfileAsync(model, _currentUser.UserId);
            return Ok(response);
        }

        [HttpPut(nameof(ChangePassword))]
        public async Task<ActionResult> ChangePassword(ChangePasswordRequest model)
        {
            var response = await _accountService.ChangePasswordAsync(model, _currentUser.UserId);
            return Ok(response);
        }

        [HttpPut(nameof(UpdateProfileSoicial))]
        public async Task<ActionResult>UpdateProfileSoicial(UpdateProfileSoicialRequest model)
        {
            var response = await _accountService.UpdateProfileSoicialAsync(model, _currentUser.UserId);
            return Ok(response);
        }
    }
}
