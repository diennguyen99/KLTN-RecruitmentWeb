using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class AppliedJob : AuditableEntity<int>
    {
        public bool MyCVOnline { get; set; }
        public int? CVId { get; set; }
        public virtual CV CV { get; set; }
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
        public string Description { get; set; }
    }
}
