using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UteJob.Application.Constants;
using UteJob.Application.Interfaces.Services;
using UteJob.Infrastructure.Contexts;
using UteJob.Infrastructure.Models.Identity;

namespace UteJob.Infrastructure
{
    public class DatabaseSeeder : IDatabaseSeeder
    {
        private readonly UteJobContext _db;
        private readonly UserManager<UteJobUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DatabaseSeeder(RoleManager<IdentityRole> roleManager, UserManager<UteJobUser> userManager, UteJobContext db)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _db = db;
        }

        public void Initialize()
        {
            AddAdmin();
            AddEmployer();
            AddCandidate();
            _db.SaveChanges();
        }

        private void AddEmployer()
        {
            Task.Run(async () =>
            {
                var employerRoleInDb = await _roleManager.FindByNameAsync(RoleConstant.Employer);
                if (employerRoleInDb == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(RoleConstant.Employer));
                }

                var employerUser = new UteJobUser
                {
                    FirstName = "Employer",
                    LastName = "John",
                    Email = "employer@gmail.com",
                    UserName = "employer",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    CreatedOn = DateTime.Now,
                    IsActive = true,
                };
                var employerUserInDb = await _userManager.FindByEmailAsync(employerUser.Email);
                if (employerUserInDb == null)
                {
                    await _userManager.CreateAsync(employerUser, RoleConstant.DefaultPassword);
                    await _userManager.AddToRoleAsync(employerUser, RoleConstant.Employer);
                }
            }).GetAwaiter().GetResult();
        }

        private void AddAdmin()
        {
            Task.Run(async () =>
            {
                var adminRoleInDb = await _roleManager.FindByNameAsync(RoleConstant.Admin);
                if (adminRoleInDb == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(RoleConstant.Admin));
                }

                var adminUser = new UteJobUser
                {
                    FirstName = "Admin",
                    LastName = "Supper",
                    Email = "superadmin@gmail.com",
                    UserName = "superadmin",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    CreatedOn = DateTime.Now,
                    IsActive = true,
                };
                var adminUserInDb = await _userManager.FindByEmailAsync(adminUser.Email);
                if (adminUserInDb == null)
                {
                    await _userManager.CreateAsync(adminUser, RoleConstant.DefaultPassword);
                    await _userManager.AddToRoleAsync(adminUser, RoleConstant.Admin);
                }
            }).GetAwaiter().GetResult();
        }

        private void AddCandidate()
        {
            Task.Run(async () =>
            {
                var candidateRoleInDb = await _roleManager.FindByNameAsync(RoleConstant.Candidate);
                if (candidateRoleInDb == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(RoleConstant.Candidate));
                }

                var candidateUser = new UteJobUser
                {
                    FirstName = "Candidate",
                    LastName = "John",
                    Email = "candidate@gmail.com",
                    UserName = "candidate",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    CreatedOn = DateTime.Now,
                    IsActive = true,
                };
                var candidateUserInDb = await _userManager.FindByEmailAsync(candidateUser.Email);
                if (candidateUserInDb == null)
                {
                    await _userManager.CreateAsync(candidateUser, RoleConstant.DefaultPassword);
                    await _userManager.AddToRoleAsync(candidateUser, RoleConstant.Candidate);
                }
            }).GetAwaiter().GetResult();
        }
    }
}
