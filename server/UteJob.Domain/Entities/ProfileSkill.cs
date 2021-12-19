using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Domain.Contracts;

namespace UteJob.Domain.Entities
{
    public class ProfileSkill : AuditableEntity<int>
    {
        public int SkillId { get; set; }
        public virtual Skill Skill { get; set; }
        public int Scores { get; set; }
    }
}
