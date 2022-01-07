import { Route } from '@angular/router';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { ResumeComponent } from "./resume/resume.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { AppliedJobComponent } from "./applied-job/applied-job.component";
import { FavouriteComponent } from "./favourite/favourite.component";

export const accountRoutes: Route[] = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'resume',
        component: ResumeComponent,
      },
      {
        path: 'applied-job',
        component: AppliedJobComponent,
      },
      {
        path: 'favourite',
        component: FavouriteComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      }
    ],
  },
];
