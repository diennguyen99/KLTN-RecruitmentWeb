using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class Favorite : AuditableEntity<int>
    {
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
    }
}
