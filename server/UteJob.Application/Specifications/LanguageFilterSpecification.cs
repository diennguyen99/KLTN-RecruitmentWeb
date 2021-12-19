using UteJob.Application.Specifications.Common;
using UteJob.Domain.Entities;

namespace UteJob.Application.Specifications
{
    public class LanguageFilterSpecification : CommonSpecification<Language>
    {
        public LanguageFilterSpecification(string searchString)
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
