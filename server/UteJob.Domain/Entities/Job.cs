using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class Job : AuditableEntity<int>
    {
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

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [Column(TypeName = "text")]
        public string Benefits { get; set; }

        [Column(TypeName = "text")]
        public string Requirements { get; set; }
        public decimal SalaryFrom { get; set; }
        public decimal SalaryTo { get; set; }
        public bool HideSalary { get; set; }
        public int NumOfPositions { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
    }
}
