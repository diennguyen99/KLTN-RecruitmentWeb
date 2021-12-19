using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Specifications.Common;
using UteJob.Domain.Entities;

namespace UteJob.Application.Specifications
{
    public class SkillFilterSpecification : CommonSpecification<Skill>
    {
        public SkillFilterSpecification(string searchString)
        {
            if (!string.IsNullOrEmpty(searchString))
            {
                Criteria = p => p.Name.Contains(searchString);
            }
            else
            {
                Criteria = p => true;
            }
        }
    }
}
