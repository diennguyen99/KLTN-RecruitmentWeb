using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Features.Languages.Commands;
using UteJob.Application.Features.Languages.Queries.GetById;
using UteJob.Domain.Entities;

namespace UteJob.Application.Mappings
{
    public class LanguageProfile : Profile
    {
        public LanguageProfile()
        {
            CreateMap<AddEditLanguageCommand, Language>();
            CreateMap<GetLanguageByIdResponse, Language>();
        }
    }
}
