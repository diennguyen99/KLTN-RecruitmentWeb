using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using UteJob.Application.Interfaces.Services;
using UteJob.Domain.Contracts;
using UteJob.Domain.Entities;
using UteJob.Infrastructure.Models.Identity;

namespace UteJob.Infrastructure.Contexts
{
    public class UteJobContext : IdentityDbContext<UteJobUser>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTimeService _dateTimeService;

        public UteJobContext(
            DbContextOptions<UteJobContext> options,
            ICurrentUserService currentUserService,
            IDateTimeService dateTimeService) : base(options)
        {
            _currentUserService = currentUserService;
            _dateTimeService = dateTimeService;
        }

        public DbSet<CV> CVs { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<JobExperience> JobExperiences { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ProfileEducation> ProfileEducations { get; set; }
        public DbSet<ProfileExperience> ProfileExperiences { get; set; }
        public DbSet<ProfileProject> ProfileProjects { get; set; }
        public DbSet<ProfileSkill> ProfileSkills { get; set; }
        public DbSet<ProfileSummary> ProfileSummaries { get; set; }
        public DbSet<JobTag> JobTags { get; set; }
        public DbSet<AppliedJob> AppliedJobs { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<IAuditableEntity>().ToList())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.IsDeleted = false;
                        entry.Entity.CreatedOn = _dateTimeService.NowUtc;
                        entry.Entity.CreatedBy = _currentUserService.UserId;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModifiedOn = _dateTimeService.NowUtc;
                        entry.Entity.LastModifiedBy = _currentUserService.UserId;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.Entity.IsDeleted = true;
                        entry.Entity.LastModifiedOn = _dateTimeService.NowUtc;
                        entry.Entity.LastModifiedBy = _currentUserService.UserId;
                        break;
                }
            }
            return await base.SaveChangesAsync(cancellationToken);
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var property in builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?)))
            {
                property.SetColumnType("decimal(18,2)");
            }

            foreach (var property in builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.Name is "LastModifiedBy" or "CreatedBy"))
            {
                property.SetColumnType("nvarchar(128)");
            }

            builder.Entity<CV>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<City>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<Skill>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<JobExperience>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<JobType>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<Job>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<Tag>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<ProfileEducation>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<ProfileExperience>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<ProfileProject>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<ProfileSkill>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<ProfileSummary>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<JobTag>().HasQueryFilter(p => !p.IsDeleted);
            builder.Entity<Favorite>().HasQueryFilter(p => !p.IsDeleted);

            base.OnModelCreating(builder);
        }
    }
}
