using System.Collections.Generic;
using UteJob.Domain.Entities;

namespace UteJob.Application.Features.CVs.Queries
{
    public class CVOnlineResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int Age { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Linkedin { get; set; }
        public string Blog { get; set; }

        public virtual ProfileSummary Summary { get; set; }
        public virtual ICollection<ProfileSkill> Skills { get; set; }
        public virtual ICollection<ProfileEducation> Educations { get; set; }
        public virtual ICollection<ProfileExperience> Experiences { get; set; }
        public virtual ICollection<ProfileProject> Projects { get; set; }

        public CVOnlineResponse()
        {
            Skills = new List<ProfileSkill>();
            Educations = new List<ProfileEducation>();
            Experiences = new List<ProfileExperience>();
            Projects = new List<ProfileProject>();
        }
    }
}
