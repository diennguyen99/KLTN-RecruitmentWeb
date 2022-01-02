import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { applicantRoutes } from './applicant-routing.module';

// services
import * as fromServices from './services';

// components
import { ApplicantComponent } from './applicant.component';

@NgModule({
  declarations: [
    ApplicantComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(applicantRoutes),
    MaterialUiModule
  ],
  providers: [...fromServices.services]
})
export class ApplicantModule { }
