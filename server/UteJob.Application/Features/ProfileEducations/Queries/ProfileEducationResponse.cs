using System;

namespace UteJob.Application.Features.ProfileEducations.Queries
{
    public class ProfileEducationResponse
    {
        public int Id { get; set; }

        public string SchoolName { get; set; }

        public string MajorsName { get; set; }

        public bool? IsPresent { get; set; }

        public DateTime? DateStart { get; set; }

        public DateTime? DateEnd { get; set; }
    }
}
