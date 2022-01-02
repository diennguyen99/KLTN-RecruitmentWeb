import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { jobRoutes } from './job-routing.module';
import { SharedModule } from "../../../shared/shared.module";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromServices from './services';

//components
import { JobListComponent } from './job-list/job-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { AddTagJobDialogComponent } from './components/add-tag-job-dialog/add-tag-job-dialog.component';

@NgModule({
  declarations: [
    JobListComponent,
    JobAddComponent,
    AddTagJobDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(jobRoutes),
    MaterialUiModule
  ],
  providers: [...fromServices.services]
})
export class JobModule { }
