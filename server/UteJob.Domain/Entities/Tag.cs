using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class Tag : AuditableEntity<int>
    {
        public string Name { get; set; }
        public string Slug { get; set; }
    }
}
