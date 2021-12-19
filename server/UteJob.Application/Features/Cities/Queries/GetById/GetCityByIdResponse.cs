using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UteJob.Application.Features.Cities.Queries.GetById
{
    public class GetCityByIdResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public bool IsShowSearch { get; set; }
    }
}
