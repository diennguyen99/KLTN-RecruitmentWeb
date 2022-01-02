import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, effects } from "./store";
import { accountRoutes } from './account.routing';

import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';
import { SharedModule } from 'src/app/shared/shared.module';

// services
import * as fromServices from './services';

// components
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { ResumeComponent } from './resume/resume.component';
import { AddEditExperienceDialogComponent } from './components/add-edit-experience-dialog/add-edit-experience-dialog.component';
import { AddEditEducationDialogComponent } from './components/add-edit-education-dialog/add-edit-education-dialog.component';
import { AddEditPortfolioDialogComponent } from './components/add-edit-portfolio-dialog/add-edit-portfolio-dialog.component';
import { AddEditSkillDialogComponent } from './components/add-edit-skill-dialog/add-edit-skill-dialog.component';
import { AddEditSummaryDialogComponent } from './components/add-edit-summary-dialog/add-edit-summary-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    ResumeComponent,
    AddEditExperienceDialogComponent,
    AddEditEducationDialogComponent,
    AddEditPortfolioDialogComponent,
    AddEditSkillDialogComponent,
    AddEditSummaryDialogComponent,
    ChangePasswordComponent,
    AppliedJobComponent
  ],
  imports: [
    RouterModule.forChild(accountRoutes),
    MaterialUiModule,
    SharedModule,
    StoreModule.forFeature('account', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services],
})
export class AccountModule {}
