using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Features.Cities.Queries.GetAllPaged
{
    public class GetAllPagedCitiesResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public bool IsShowSearch { get; set; }
    }
}
