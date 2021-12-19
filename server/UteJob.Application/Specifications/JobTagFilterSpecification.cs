using UteJob.Application.Specifications.Common;
using UteJob.Domain.Entities;

namespace UteJob.Application.Specifications
{
    public class JobTagFilterSpecification : CommonSpecification<JobTag>
    {
        public JobTagFilterSpecification(string tag, string city, int jobTypeId, int jobExperienceId)
        {
            Includes.Add(a => a.Job);
            Includes.Add(a => a.Tag);
            if (!string.IsNullOrEmpty(tag) && !string.IsNullOrEmpty(city))
            {
                Criteria = p => p.Tag.Slug.Contains(tag) &&
                                p.Job.City.Slug.Contains(city) &&
                                (jobTypeId != 0 ? p.Job.JobTypeId == jobTypeId : true) &&
                                (jobExperienceId != 0 ? p.Job.JobExperienceId == jobExperienceId : true);
            }
            else if(!string.IsNullOrEmpty(tag))
            {
                Criteria = p => p.Tag.Slug.Contains(tag) &&
                                (jobTypeId != 0 ? p.Job.JobTypeId == jobTypeId : true) &&
                                (jobExperienceId != 0 ? p.Job.JobExperienceId == jobExperienceId : true);
            }
            else if (!string.IsNullOrEmpty(city))
            {
                Criteria = p => p.Job.City.Slug.Contains(city) &&
                                (jobTypeId != 0 ? p.Job.JobTypeId == jobTypeId : true) &&
                                (jobExperienceId != 0 ? p.Job.JobExperienceId == jobExperienceId : true);
            }
            else
            {
                Criteria = p => true;
            }
        }
    }
}
