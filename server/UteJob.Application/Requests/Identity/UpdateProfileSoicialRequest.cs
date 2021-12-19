using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Requests.Identity
{
    public class UpdateProfileSoicialRequest
    {
        public string Facebook { get; set; }

        public string Twitter { get; set; }

        public string Linkedin { get; set; }

        public string Blog { get; set; }
    }
}
