import { Routes } from '@angular/router';
import { JobComponent } from "./job.component";
import { JobTypeComponent } from "./job-type/job-type.component";
import { JobExperienceComponent } from "./job-experience/job-experience.component";

export const jobRoutes: Routes = [
  {
    path: 'job-type',
    component: JobTypeComponent,
  },
  {
    path: 'job-experience',
    component: JobExperienceComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: JobComponent
  }
];
