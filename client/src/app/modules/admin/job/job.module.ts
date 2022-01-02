import { NgModule } from '@angular/core';
import { jobRoutes } from './job-routing.module';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromService from './services';

// components
import { JobComponent } from './job.component';
import { JobExperienceComponent } from './job-experience/job-experience.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { AddJobTypeDialogComponent } from './components/add-job-type-dialog/add-job-type-dialog.component';
import { AddJobExperienceDialogComponent } from './components/add-job-experience-dialog/add-job-experience-dialog.component';

@NgModule({
  declarations: [
    JobComponent,
    JobExperienceComponent,
    JobTypeComponent,
    AddJobTypeDialogComponent,
    AddJobExperienceDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(jobRoutes),
    MaterialUiModule
  ],
  providers: [...fromService.services]
})
export class JobModule { }
