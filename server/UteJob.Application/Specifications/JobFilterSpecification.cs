using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Specifications.Common;
using UteJob.Domain.Entities;

namespace UteJob.Application.Specifications
{
    public class JobFilterSpecification : CommonSpecification<Job>
    {
        public JobFilterSpecification(string searchString)
        {
            Includes.Add(a => a.Company);
            Includes.Add(a => a.City);
            Includes.Add(a => a.JobType);
            Includes.Add(a => a.JobExperience);
            if (!string.IsNullOrEmpty(searchString))
            {
                Criteria = p => p.Title.Contains(searchString);
            }
            else
            {
                Criteria = p => true;
            }
        }
    }
}
