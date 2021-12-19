using System;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.JobTags.Queries
{
    public class JobTagResponse
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int TagId { get; set; }
        public string Company { get; set; }
        public string CompanyLogo { get; set; }
        public string City { get; set; }
        public string JobType { get; set; }
        public string JobExperience { get; set; }
        public string JobTitle { get; set; }
        public string JobSlug { get; set; }
        public decimal SalaryFrom { get; set; }
        public decimal SalaryTo { get; set; }
        public bool HideSalary { get; set; }
        public DateTime JobCreatedOn { get; set; }
    }
}
