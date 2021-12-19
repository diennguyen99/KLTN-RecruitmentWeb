using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using UteJob.Application.Responses.Photo;
using UteJob.Application.Wrapper;

namespace UteJob.Application.Interfaces.Services
{
    public interface IPhotoService
    {
        Task<IResult<PhotoResponse>> AddPhotoAsync(IFormFile file);
        Task<IResult<string>> DeletePhotoAsync(string publicId);
    }
}
