using AutoMapper;
using UteJob.Application.Responses.Identity;
using UteJob.Infrastructure.Models.Identity;

namespace UteJob.Infrastructure.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserResponse, UteJobUser>().ReverseMap();
        }
    }
}
