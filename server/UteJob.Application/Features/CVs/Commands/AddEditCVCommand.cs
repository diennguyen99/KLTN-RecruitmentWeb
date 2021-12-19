using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Application.Interfaces.Services;
using UteJob.Application.Requests.File;
using UteJob.Application.Wrapper;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.CVs.Commands
{
    public class AddEditCVCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public UploadRequest UploadRequest { get; set; }
    }

    public class AddEditCVCommandHanlder : IRequestHandler<AddEditCVCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IUploadService _uploadService;

        public AddEditCVCommandHanlder(IUnitOfWork<int> unitOfWork, IMapper mapper, IUploadService uploadService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _uploadService = uploadService;
        }

        public async Task<Result<int>> Handle(AddEditCVCommand command, CancellationToken cancellationToken)
        {
            var uploadRequest = command.UploadRequest;
            if (uploadRequest != null)
            {
                uploadRequest.FileName = $"CV-{Guid.NewGuid()}{uploadRequest.Extension}";
            }

            if (command.Id == 0)
            {
                var cv = _mapper.Map<CV>(command);
                if (uploadRequest != null)
                {
                    cv.URL = _uploadService.UploadAsync(uploadRequest);
                }
                await _unitOfWork.Repository<CV>().AddAsync(cv);
                await _unitOfWork.Commit(cancellationToken);
                return await Result<int>.SuccessAsync(cv.Id, "CV Saved");
            }
            else
            {
                var cv = await _unitOfWork.Repository<CV>().GetByIdAsync(command.Id);
                if (cv != null)
                {
                    cv.Title = command.Title ?? cv.Title;
                    if (uploadRequest != null)
                    {
                        cv.URL = _uploadService.UploadAsync(uploadRequest);
                    }
                    await _unitOfWork.Repository<CV>().UpdateAsync(cv);
                    await _unitOfWork.Commit(cancellationToken);
                    return await Result<int>.SuccessAsync(cv.Id, "CV Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("CV Not Found!");
                }
            }
        }
    }
}
