using System;
using UteJob.Application.Interfaces.Services;

namespace UteJob.Infrastructure.Shared.Services
{
    public class SystemDateTimeService : IDateTimeService
    {
        public DateTime NowUtc => DateTime.Now;
    }
}
