using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class JobTag : AuditableEntity<int>
    {
        public int JobId { get; set; }
        public Job Job { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
