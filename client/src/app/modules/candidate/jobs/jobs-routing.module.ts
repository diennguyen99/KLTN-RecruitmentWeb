import { Routes } from '@angular/router';
import { JobsComponent } from "./jobs.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";

export const jobsRoutes: Routes = [
  {
    path: ':slug',
    component: JobDetailComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: JobsComponent
  }
];
