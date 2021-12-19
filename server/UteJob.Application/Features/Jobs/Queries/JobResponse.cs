using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.Jobs.Queries
{
    public class JobResponse
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public int JobTypeId { get; set; }
        public virtual JobType JobType { get; set; }
        public int JobExperienceId { get; set; }
        public virtual JobExperience JobExperience { get; set; }

        public string Title { get; set; }
        public string Slug { get; set; }
        public decimal SalaryFrom { get; set; }
        public decimal SalaryTo { get; set; }
        public bool HideSalary { get; set; }
        public int NumOfPositions { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
    }
}
