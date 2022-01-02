import { Routes } from '@angular/router';
import { JobAddComponent } from "./job-add/job-add.component";
import { JobListComponent } from "./job-list/job-list.component";

export const jobRoutes: Routes = [
  {
    path: 'create',
    component: JobAddComponent
  },
  {
    path: 'edit/:id',
    component: JobAddComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: JobListComponent
  }
];
