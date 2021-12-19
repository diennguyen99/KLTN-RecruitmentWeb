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
    public interface ITokenService
    {
        Task<Result<TokenResponse>> LoginAsync(TokenRequest model);

        Task<Result<TokenResponse>> GetRefreshTokenAsync(RefreshTokenRequest model);
    }
}
