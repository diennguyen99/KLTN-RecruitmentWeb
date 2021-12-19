using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services.Identity;
using UteJob.Application.Requests.Identity;
using UteJob.Application.Responses.Identity;
using UteJob.Application.Wrapper;
using UteJob.Infrastructure.Models.Identity;

namespace UteJob.Infrastructure.Services.Identity
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<UteJobUser> _userManager;
        private readonly SignInManager<UteJobUser> _signInManager;

        public AccountService(
           UserManager<UteJobUser> userManager,
           SignInManager<UteJobUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IResult> ChangePasswordAsync(ChangePasswordRequest model, string userId)
        {
            var user = await this._userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return await Result.FailAsync("User Not Found.");
            }

            var identityResult = await this._userManager.ChangePasswordAsync(
                user,
                model.Password,
                model.NewPassword);
            var errors = identityResult.Errors.Select(e => e.Description.ToString()).ToList();
            return identityResult.Succeeded ? await Result.SuccessAsync() : await Result.FailAsync(errors);
        }

        public async Task<IResult> GetProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return await Result<string>.FailAsync(message: "User Not Found");
            var response = new ProfileResponse
            {
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = user.Address,
                City = user.City,
                Facebook = user.Facebook,
                Twitter = user.Twitter,
                Linkedin = user.Linkedin,
                Blog = user.Blog,
                Age = user.Age
            };
            return await Result<ProfileResponse>.SuccessAsync(response);
        }

        public async Task<IResult> UpdateProfileAsync(UpdateProfileRequest request, string userId)
        {
            if (!string.IsNullOrWhiteSpace(request.PhoneNumber))
            {
                var userWithSamePhoneNumber = await _userManager.Users.FirstOrDefaultAsync(x => x.PhoneNumber == request.PhoneNumber);
                if (userWithSamePhoneNumber != null && userWithSamePhoneNumber.PhoneNumber != request.PhoneNumber)
                {
                    return await Result.FailAsync(string.Format("Phone number {0} is already used.", request.PhoneNumber));
                }
            }

            var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
            if (userWithSameEmail == null || userWithSameEmail.Id == userId)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return await Result.FailAsync("User Not Found.");
                }

                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.PhoneNumber = request.PhoneNumber;
                user.Age = request.Age;
                user.Address = request.Address;
                user.City = request.City;

                var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
                if (request.PhoneNumber != phoneNumber)
                {
                    var setPhoneResult = await _userManager.SetPhoneNumberAsync(user, request.PhoneNumber);
                }
                var identityResult = await _userManager.UpdateAsync(user);
                var errors = identityResult.Errors.Select(e => e.Description.ToString()).ToList();
                await _signInManager.RefreshSignInAsync(user);
                return identityResult.Succeeded ? await Result.SuccessAsync("Update Profile Success!") : await Result.FailAsync(errors);
            }
            else
            {
                return await Result.FailAsync(string.Format("Email {0} is already used.", request.Email));
            }
        }

        public async Task<IResult<string>> UpdateProfileSoicialAsync(UpdateProfileSoicialRequest request, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return await Result<string>.FailAsync(message: "User Not Found");
            user.Facebook = request.Facebook;
            user.Twitter = request.Twitter;
            user.Linkedin = request.Linkedin;
            user.Blog = request.Blog;
            var identityResult = await _userManager.UpdateAsync(user);
            var errors = identityResult.Errors.Select(e => e.Description.ToString()).ToList();
            return identityResult.Succeeded ? await Result<string>.SuccessAsync() : await Result<string>.FailAsync(errors);
        }
    }
}
