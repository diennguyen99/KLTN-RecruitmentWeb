using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services.Identity;
using UteJob.Application.Responses.Identity;
using UteJob.Application.Wrapper;
using UteJob.Infrastructure.Models.Identity;

namespace UteJob.Infrastructure.Services.Identity
{
    public class UserService : IUserService
    {
        private readonly UserManager<UteJobUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<UteJobUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<Result<List<UserResponse>>> GetAllAsync()
        {
            var users = await _userManager.Users
                                .AsNoTracking()
                                .ToListAsync();
            var result = _mapper.Map<List<UserResponse>>(users);
            return await Result<List<UserResponse>>.SuccessAsync(result);
        }

        public async Task<Result<string>> LockUser(string userId, bool isLock)
        {
            var user = await _userManager.FindByIdAsync(userId);
            user.IsActive = isLock;
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return await Result<string>.SuccessAsync(user.Id, "User Updated Succesffully.");
            }
            else
            {
                return await Result<string>.FailAsync("User Updated Fail");
            }
        }
    }
}
