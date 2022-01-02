using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Responses.Identity;
using UteJob.Application.Wrapper;

namespace UteJob.Application.Interfaces.Services.Identity
{
    public interface IUserService
    {
        Task<Result<List<UserResponse>>> GetAllAsync();
        Task<Result<string>> LockUser(string userId, bool isLock);
    }
}
