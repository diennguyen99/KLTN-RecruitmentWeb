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

namespace UteJob.Application.Features.Companies.Commands
{
    public class AddEditCompanyCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Slug { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Address { get; set; }

        public IFormFile Logo { get; set; }

        public string Description { get; set; }
        public string Website { get; set; }
        public int? EstablishedIn { get; set; }
        public int? NumberOfEmployees { get; set; }
        public string Fax { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Linkedin { get; set; }
    }

    internal class AddEditCompanyCommandHandler : IRequestHandler<AddEditCompanyCommand, Result<int>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IPhotoService _photoService;

        public AddEditCompanyCommandHandler(IUnitOfWork<int> unitOfWork, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
        }

        public async Task<Result<int>> Handle(AddEditCompanyCommand command, CancellationToken cancellationToken)
        {
            string logoUrl = null;
            if (command.Logo != null)
            {
                var logo = await _photoService.AddPhotoAsync(command.Logo);
                if (!logo.Succeeded)
                {
                    return await Result<int>.FailAsync("Logo Not Found!");
                }
                logoUrl = logo.Data.Url;
            }


            if (command.Id == 0)
            {
                var company = new Company
                {
                    Id = 0,
                    Name = command.Name,
                    Slug = command.Slug,
                    Email = command.Email,
                    Phone = command.Phone,
                    Logo = logoUrl,
                    Address = command.Address,
                    Description = command.Description,
                    EstablishedIn = command.EstablishedIn,
                    NumberOfEmployees = command.NumberOfEmployees,
                    Fax = command.Fax,
                    Facebook = command.Facebook,
                    Twitter = command.Twitter,
                    Linkedin = command.Linkedin

                };
                await _unitOfWork.Repository<Company>().AddAsync(company);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(company.Id, "Company Saved");
            }
            else
            {
                var company = await _unitOfWork.Repository<Company>().GetByIdAsync(command.Id);
                if (company != null)
                {
                    company.Name = command.Name ?? company.Name;
                    company.Slug = command.Slug ?? company.Slug;
                    company.Email = command.Email ?? company.Email;
                    company.Phone = command.Phone ?? company.Phone;
                    company.Logo = logoUrl ?? company.Logo;
                    company.Address = command.Address ?? company.Address;
                    company.Description = command.Description ?? company.Description;
                    company.Website = command.Website ?? company.Website;
                    company.EstablishedIn = command.EstablishedIn ?? company.EstablishedIn;
                    company.NumberOfEmployees = command.NumberOfEmployees ?? company.NumberOfEmployees;
                    company.Fax = command.Fax ?? company.Fax;
                    company.Facebook = command.Facebook ?? company.Facebook;
                    company.Twitter = command.Twitter ?? company.Twitter;
                    company.Linkedin = command.Linkedin ?? company.Linkedin;
                    await _unitOfWork.Repository<Company>().UpdateAsync(company);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(company.Id, "Company Summary Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("Company Not Found!");
                }
            }
        }
    }
}
