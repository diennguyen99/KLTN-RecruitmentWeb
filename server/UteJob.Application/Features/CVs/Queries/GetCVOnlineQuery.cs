using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services.Identity;
using UteJob.Application.Responses.Identity;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.CVs.Queries
{
    public class GetCVOnlineQuery : IRequest<Result<CVOnlineResponse>>
    {
        public string UserId { get; set; }
    }

    internal class GetCVOnlineQueryHandler : IRequestHandler<GetCVOnlineQuery, Result<CVOnlineResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IAccountService _accountService;

        public GetCVOnlineQueryHandler(IUnitOfWork<int> unitOfWork, IAccountService accountService)
        {
            _unitOfWork = unitOfWork;
            _accountService = accountService;
        }

        public async Task<Result<CVOnlineResponse>> Handle(GetCVOnlineQuery request, CancellationToken cancellationToken)
        {
            var user = await _accountService.GetProfileAsync(request.UserId) as Result<ProfileResponse>;

            var summary = await _unitOfWork.Repository<ProfileSummary>()
                            .Entities
                            .FirstOrDefaultAsync(s => s.CreatedBy == request.UserId);

            var skills = await _unitOfWork.Repository<ProfileSkill>()
                            .Entities
                            .Where(s => s.CreatedBy == request.UserId)
                            .Include(s => s.Skill)
                            .ToListAsync();

            var educations = await _unitOfWork.Repository<ProfileEducation>()
                            .Entities
                            .Where(s => s.CreatedBy == request.UserId)
                            .ToListAsync();

            var experiences = await _unitOfWork.Repository<ProfileExperience>()
                            .Entities
                            .Where(s => s.CreatedBy == request.UserId)
                            .ToListAsync();

            var projects = await _unitOfWork.Repository<ProfileProject>()
                           .Entities
                           .Where(s => s.CreatedBy == request.UserId)
                           .ToListAsync();

            var response = new CVOnlineResponse
            {
                FirstName = user.Data.FirstName,
                LastName = user.Data.LastName,
                Email = user.Data.Email,
                Phone = user.Data.PhoneNumber,
                Address = user.Data.Address,
                City = user.Data.City,
                Age = user.Data.Age,
                Facebook = user.Data.Facebook,
                Twitter = user.Data.Twitter,
                Linkedin = user.Data.Linkedin,
                Blog = user.Data.Blog,
                Summary = summary,
                Skills = skills,
                Educations = educations,
                Experiences = experiences,
                Projects = projects
            };

            return await Result<CVOnlineResponse>.SuccessAsync(response);
        }
    }
}
