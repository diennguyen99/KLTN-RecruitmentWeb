using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Interfaces.Repositories
{
    public interface IJobRepository
    {
        Task<bool> IsJobTypeUsed(int jobTypeId);
    }
}
