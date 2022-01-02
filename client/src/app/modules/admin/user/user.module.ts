import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { userRoutes } from './user-routing.module';
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromServices from './services';

// components
import { UserComponent } from './user.component';
import { LockUserDialogComponent } from './components/lock-user-dialog/lock-user-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    LockUserDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    MaterialUiModule
  ],
  providers: [...fromServices.services],
})
export class UserModule { }
