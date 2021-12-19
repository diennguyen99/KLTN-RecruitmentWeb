using System.Collections.Generic;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class Company : AuditableEntity<int>
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public int? EstablishedIn { get; set; }
        public int? NumberOfEmployees { get; set; }
        public string Fax { get; set; }
        public string Phone { get; set; }
        public string Logo { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Linkedin { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }

        public Company()
        {
            Jobs = new List<Job>();
        }
    }
}
