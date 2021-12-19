import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {AuthGuard} from "./core/guards/auth.guard";
import {RoleGuard} from "./core/guards/role.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'auth',
    },
    children: [
      {
        path: '',
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
  {
    path: 'candidate',
    //canActivate: [AuthGuard, RoleGuard],
    component: LayoutComponent,
    data: {
      layout: 'candidate',
      allowedRoles: ['Candidate']
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
