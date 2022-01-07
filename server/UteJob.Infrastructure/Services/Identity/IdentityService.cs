using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Exceptions;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Interfaces.Services.Identity;
using UteJob.Application.Requests.Identity;
using UteJob.Application.Requests.Mail;
using UteJob.Application.Responses.Identity;
using UteJob.Application.Wrapper;
using UteJob.Infrastructure.Models.Identity;

namespace UteJob.Infrastructure.Services.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<UteJobUser> _userManager;
        private readonly IMailService _mailService;
        private readonly IMapper _mapper;

        public IdentityService(
            UserManager<UteJobUser> userManager,
            IMailService mailService,
            IMapper mapper)
        {
            _userManager = userManager;
            _mailService = mailService;
            _mapper = mapper;
        }

        public async Task<IResult<string>> ConfirmEmailAsync(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                return await Result<string>.SuccessAsync(user.Id, string.Format("Account Confirmed for {0}. You can now use the /api/identity/token endpoint to generate JWT.", user.Email));
            }
            else
            {
                throw new ApiException(string.Format("An error occurred while confirming {0}", user.Email));
            }
        }

        public async Task<IResult<UserResponse>> GetAsync(string userId)
        {
            var user = await _userManager.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            var result = _mapper.Map<UserResponse>(user);
            return await Result<UserResponse>.SuccessAsync(result);
        }

        public async Task<int> GetCountAsync()
        {
            var count = await _userManager.Users.CountAsync();
            return count;
        }

        public async Task<IResult> RegisterAsync(RegisterRequest request, string origin)
        {
            var userWithSameUserName = await _userManager.FindByNameAsync(request.UserName);
            if (userWithSameUserName != null)
            {
                return Result.Fail($"Username '{request.UserName}' is already taken.");
            }
            var user = new UteJobUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.UserName,
                PhoneNumber = request.PhoneNumber,
                IsActive = true
            };

            var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
            if (userWithSameEmail == null)
            {
                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, request.RoleName);

                    var verificationUri = await SendVerificationEmail(user, origin);

                    await _mailService.SendAsync(new MailRequest() {
                        From = "support@ute-job.com", To = user.Email,
                        Body = $"Please confirm your account by <a href='{verificationUri}'>clicking here</a>.",
                        Subject = "Confirm Registration"
                    });
                    return Result<string>.Success(user.Id, message: $"User Registered Mailbox");
                }
                else
                {
                    return Result.Fail(result.Errors.Select(a => a.Description).ToList());
                }
            }
            else
            {
                return Result.Fail($"Email {request.Email } is already registered.");
            }
        }


        private async Task<string> SendVerificationEmail(UteJobUser user, string origin)
        {
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var route = "confirm-email/";
            var _enpointUri = new Uri(string.Concat($"{origin}/", route));
            var verificationUri = QueryHelpers.AddQueryString(_enpointUri.ToString(), "userId", user.Id);
            verificationUri = QueryHelpers.AddQueryString(verificationUri, "code", code);
            return verificationUri;
        }
    }
}
