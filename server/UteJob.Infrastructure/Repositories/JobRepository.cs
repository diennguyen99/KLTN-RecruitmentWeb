using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Repositories;
using UteJob.Domain.Entities;

namespace UteJob.Infrastructure.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly IRepositoryAsync<Job, int> _repository;

        public JobRepository(IRepositoryAsync<Job, int> repository)
        {
            _repository = repository;
        }

        public async Task<bool> IsJobTypeUsed(int jobTypeId)
        {
            return await _repository.Entities.AnyAsync(j => j.JobTypeId == jobTypeId);
        }
    }
}
