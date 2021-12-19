using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class City : AuditableEntity<int>
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public bool IsShowSearch { get; set; }

        public virtual ICollection<Company> Companies { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }

        public City()
        {
            Companies = new List<Company>();
            Jobs = new List<Job>();
        }
    }
}
