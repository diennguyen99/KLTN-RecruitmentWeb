using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Requests.File
{
    public class UploadRequest
    {
        public string FileName { get; set; }
        public string Extension { get; set; }
        public IFormFile File { get; set; }
    }
}
