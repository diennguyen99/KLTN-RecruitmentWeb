using UteJob.Domain.Entities;

namespace UteJob.Application.Features.ProfileSkills.Queries
{
    public class ProfileSkillResponse
    {
        public int Id { get; set; }
        public int SkillId { get; set; }
        public virtual Skill Skill { get; set; }
        public int Scores { get; set; }
    }
}
