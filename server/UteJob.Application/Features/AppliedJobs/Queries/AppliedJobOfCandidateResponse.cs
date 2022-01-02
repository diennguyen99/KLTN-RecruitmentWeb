using System;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.AppliedJobs.Queries
{
    public class AppliedJobOfCandidateResponse
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string JobTitle { get; set; }
        public string CVUrl { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
        public string Description { get; set; }
        public bool MyCVOnline { get; set; }
        public int CVId { get; set; }
        public CV CV { get; set; }

        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
    }
}
