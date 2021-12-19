using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Interfaces.Services
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        public bool IsInRole(string role);
    }
}
