import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from "./core/guards/auth.guard";
import { RoleGuard } from "./core/guards/role.guard";
import { CompanyGuard } from "./core/guards/company.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'auth',
    },
    children: [
      {
        path: 'confirm-email',
        loadChildren: () =>
          import('./modules/auth/confirm-email/confirm-email.module').then(
            (m) => m.ConfirmEmailModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./modules/auth/sign-up/sign-up.module').then(
            (m) => m.SignUpModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/auth/sign-in/sign-in.module').then(
            (m) => m.SignInModule
          ),
      },
    ],
  },
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'home',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/welcome/welcome.module').then(
            (m) => m.WelcomeModule
          ),
      },
    ],
  },

  // =============== Candidate ROLE ================
  {
    path: 'candidate',
    canActivate: [AuthGuard, RoleGuard],
    component: LayoutComponent,
    data: {
      layout: 'candidate',
      allowedRoles: ['Candidate', 'Employer', 'Admin']
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/candidate/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./modules/candidate/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./modules/candidate/jobs/jobs.module').then(
            (m) => m.JobsModule
          ),
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('./modules/candidate/companies/companies.module').then(
            (m) => m.CompaniesModule
          ),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./modules/candidate/about-us/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      }
    ],
  },

  // =============== Employer ROLE ================
  {
    path: 'employer',
    canActivate: [AuthGuard, RoleGuard],
    component: LayoutComponent,
    data: {
      layout: 'employer',
      allowedRoles: ['Employer']
    },
    children: [
      {
        path: 'company',
        loadChildren: () =>
          import('./modules/employer/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'job',
        canActivate: [CompanyGuard],
        loadChildren: () =>
          import('./modules/employer/job/job.module').then(
            (m) => m.JobModule
          ),
      },
      {
        path: 'applicants',
        canActivate: [CompanyGuard],
        loadChildren: () =>
          import('./modules/employer/applicant/applicant.module').then(
            (m) => m.ApplicantModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/employer/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  // =============== Admin ROLE ================
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    component: LayoutComponent,
    data: {
      layout: 'admin',
      allowedRoles: ['Admin']
    },
    children: [
      {
        path: 'company',
        loadChildren: () =>
          import('./modules/admin/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'job',
        loadChildren: () =>
          import('./modules/admin/job/job.module').then(
            (m) => m.JobModule
          ),
      },
      {
        path: 'skill',
        loadChildren: () =>
          import('./modules/admin/skill/skill.module').then(
            (m) => m.SkillModule
          ),
      },
      {
        path: 'city',
        loadChildren: () =>
          import('./modules/admin/city/city.module').then(
            (m) => m.CityModule
          ),
      },
      {
        path: 'tag',
        loadChildren: () =>
          import('./modules/admin/tag/tag.module').then(
            (m) => m.TagModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/admin/user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
