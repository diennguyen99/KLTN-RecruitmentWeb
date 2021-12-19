import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { jobsRoutes } from './jobs-routing.module';

import { JobsComponent } from './jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { SharedModule } from "../../../shared/shared.module";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { ApplyJobDialogComponent } from './components/apply-job-dialog/apply-job-dialog.component';


@NgModule({
  declarations: [
    JobsComponent,
    JobDetailComponent,
    ApplyJobDialogComponent
  ],
  imports: [
    RouterModule.forChild(jobsRoutes),
    SharedModule,
    MaterialUiModule
  ]
})
export class JobsModule { }
