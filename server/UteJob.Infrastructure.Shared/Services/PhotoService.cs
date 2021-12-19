using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Responses.Photo;
using UteJob.Application.Wrapper;

namespace UteJob.Infrastructure.Shared.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<Application.Configurations.CloudinaryConfiguration> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<IResult<PhotoResponse>> AddPhotoAsync(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    return await Result<PhotoResponse>.FailAsync(uploadResult.Error.Message);
                }

                var response = new PhotoResponse
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };

                return await Result<PhotoResponse>.SuccessAsync(response);
            }

            return await Result<PhotoResponse>.FailAsync(message: "Photo not Found"); ;
        }

        public async Task<IResult<string>> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? await Result<string>.SuccessAsync() : await Result<string>.FailAsync(result.Error.Message);
        }
    }
}
