using System;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class ProfileEducation : AuditableEntity<int>
    {
        public string SchoolName { get; set; }

        public string MajorsName { get; set; }

        public bool? IsPresent { get; set; }

        public DateTime? DateStart { get; set; }

        public DateTime? DateEnd { get; set; }
    }
}
