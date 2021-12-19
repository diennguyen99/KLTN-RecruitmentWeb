using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Domain.Entities;

namespace UteJob.Infrastructure.Repositories
{
    public class JobTypeRepository : IJobTypeRepository
    {
        private readonly IRepositoryAsync<JobType, int> _repository;

        public JobTypeRepository(IRepositoryAsync<JobType, int> repository)
        {
            _repository = repository;
        }
    }
}
