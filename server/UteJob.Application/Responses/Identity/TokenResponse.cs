using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Responses.Identity
{
    public class TokenResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
