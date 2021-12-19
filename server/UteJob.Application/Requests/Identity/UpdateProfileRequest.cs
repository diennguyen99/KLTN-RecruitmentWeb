using System.ComponentModel.DataAnnotations;
using UteJob.Domain.Entities;

namespace UteJob.Application.Requests.Identity
{
    public class UpdateProfileRequest
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }

        public int Age { get; set; }

        public string Address { get; set; }

        public string City { get; set; }
    }
}
