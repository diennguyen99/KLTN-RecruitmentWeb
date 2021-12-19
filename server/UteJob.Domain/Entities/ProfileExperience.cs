using System;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class ProfileExperience : AuditableEntity<int>
    {
        public string Position { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public bool? IsPresent { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
    }
}
