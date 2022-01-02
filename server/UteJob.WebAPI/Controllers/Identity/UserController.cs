using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services.Identity;

namespace UteJob.WebAPI.Controllers.Identity
{
    [Authorize]
    public class UserController : ApiControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> LockUser([FromBody] LockUserRequest lockUserRequest)
        {
            var user = await _userService.LockUser(lockUserRequest.UserId, lockUserRequest.IsLock);
            return Ok(user);
        }
    }

    public class LockUserRequest
    {
        public string UserId { get; set; }

        public bool IsLock { get; set; }
    }
}
