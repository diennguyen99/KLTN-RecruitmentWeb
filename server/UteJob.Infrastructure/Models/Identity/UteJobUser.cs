using Microsoft.AspNetCore.Identity;
using System;
using UteJob.Domain.Contracts;
using UteJob.Domain.Entities;

namespace UteJob.Infrastructure.Models.Identity
{
    public class UteJobUser: IdentityUser, IAuditableEntity<string>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Facebook { get; set; }

        public string Twitter { get; set; }

        public string Linkedin { get; set; }

        public string Blog { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public bool IsActive { get; set; }

        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
