using UteJob.Application.Specifications.Common;
using UteJob.Domain.Entities;

namespace UteJob.Application.Specifications
{
    public class CityFilterSpecification : CommonSpecification<City>
    {
        public CityFilterSpecification(string searchString)
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
