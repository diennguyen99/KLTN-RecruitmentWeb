using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class JobExperience : AuditableEntity<int>
    {
        public string Name { get; set; }
    }
}
