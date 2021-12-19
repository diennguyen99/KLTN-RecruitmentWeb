using System.Threading.Tasks;
using UteJob.Application.Requests.Identity;
using UteJob.Application.Wrapper;

namespace UteJob.Application.Interfaces.Services.Identity
{
    public interface IAccountService
    {
        Task<IResult> UpdateProfileAsync(UpdateProfileRequest request, string userId);

        Task<IResult<string>> UpdateProfileSoicialAsync(UpdateProfileSoicialRequest request, string userId);

        Task<IResult> ChangePasswordAsync(ChangePasswordRequest model, string userId);

        Task<IResult> GetProfileAsync(string userId);
    }
}
