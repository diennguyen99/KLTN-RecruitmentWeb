using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class CV : AuditableEntity<int>
    {
        public string Title { get; set; }
        public string URL { get; set; }
    }
}
