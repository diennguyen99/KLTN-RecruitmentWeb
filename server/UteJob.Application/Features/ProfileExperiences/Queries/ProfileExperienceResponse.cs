using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Features.ProfileExperiences.Queries
{
    public class ProfileExperienceResponse
    {
        public int Id { get; set; }
        public string Position { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public bool? IsPresent { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
    }
}
