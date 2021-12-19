using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileProjects.Commands
{
    public class AddEditProfileProjectCommand : IRequest<Result<ProfileProject>>
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Url { get; set; }

        public IFormFile Thumbnail { get; set; }

        public DateTime? DateStart { get; set; }

        public DateTime? DateEnd { get; set; }
    }

    internal class AddEditProfileProjectCommandHandler : IRequestHandler<AddEditProfileProjectCommand, Result<ProfileProject>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IPhotoService _photoService;

        public AddEditProfileProjectCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<Result<ProfileProject>> Handle(AddEditProfileProjectCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                // upload image
                var thumbnail = await _photoService.AddPhotoAsync(command.Thumbnail);
                if (!thumbnail.Succeeded)
                {
                    return await Result<ProfileProject>.FailAsync("Thumbnail Not Found!");
                }

                var profileProject = new ProfileProject
                {
                    Id = 0,
                    Title = command.Title,
                    Description = command.Description,
                    Url = command.Url,
                    DateStart = command.DateStart,
                    DateEnd = command.DateEnd,
                    Thumbnail = thumbnail.Data.Url
                };

                await _unitOfWork.Repository<ProfileProject>().AddAsync(profileProject);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<ProfileProject>.SuccessAsync(profileProject, "Profile Project Saved");
            }
            else
            {
                var profileProject = await _unitOfWork.Repository<ProfileProject>().GetByIdAsync(command.Id);
                if (profileProject != null)
                {
                    profileProject.Title = command.Title ?? profileProject.Title;
                    profileProject.Description = command.Description ?? profileProject.Description;
                    profileProject.Url = command.Url ?? profileProject.Url;
                    profileProject.Thumbnail = profileProject.Thumbnail;

                    // upload image
                    if (command.Thumbnail != null)
                    {
                        var thumbnail = await _photoService.AddPhotoAsync(command.Thumbnail);
                        if (!thumbnail.Succeeded)
                        {
                            return await Result<ProfileProject>.FailAsync("Thumbnail Not Found!");
                        }
                        profileProject.Thumbnail = thumbnail.Data.Url;
                    }

                    profileProject.DateStart = command.DateStart ?? profileProject.DateStart;
                    profileProject.DateEnd = command.DateEnd ?? profileProject.DateEnd;
                    await _unitOfWork.Repository<ProfileProject>().UpdateAsync(profileProject);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<ProfileProject>.SuccessAsync(profileProject, "Profile Project Updated");
                }
                else
                {
                    return await Result<ProfileProject>.FailAsync("Profile Project Not Found!");
                }
            }
        }
    }
}
