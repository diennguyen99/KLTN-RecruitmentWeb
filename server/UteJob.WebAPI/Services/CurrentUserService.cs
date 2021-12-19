using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services;

namespace UteJob.WebAPI.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _accessor;

        public CurrentUserService(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string UserId => _accessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        public List<KeyValuePair<string, string>> Claims => _accessor.HttpContext?.User?.Claims.AsEnumerable().Select(item => new KeyValuePair<string, string>(item.Type, item.Value)).ToList();

        public bool IsInRole(string role)
        {
            return _accessor.HttpContext?.User.IsInRole(role) ?? false;
        }
    }
}
