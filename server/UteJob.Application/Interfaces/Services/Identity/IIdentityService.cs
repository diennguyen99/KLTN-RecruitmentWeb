using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Requests.Identity;
using UteJob.Application.Responses.Identity;
using UteJob.Application.Wrapper;

namespace UteJob.Application.Interfaces.Services.Identity
{
    public interface IIdentityService
    {
        public Task<IResult> RegisterAsync(RegisterRequest request, string origin);

        Task<IResult<string>> ConfirmEmailAsync(string userId, string code);

        Task<int> GetCountAsync();

        Task<IResult<UserResponse>> GetAsync(string userId);
    }
}
