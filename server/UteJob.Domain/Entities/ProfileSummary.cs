using System.ComponentModel.DataAnnotations.Schema;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class ProfileSummary : AuditableEntity<int>
    {
        [Column(TypeName = "text")]
        public string Summary { get; set; }
    }
}
