using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class Favorite : AuditableEntity<int>
    {
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
    }
}
