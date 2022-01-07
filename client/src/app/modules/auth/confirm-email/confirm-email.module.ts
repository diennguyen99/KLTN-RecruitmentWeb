import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { confirmEmail } from "./confirm-email.routing";
import { SharedModule } from "../../../shared/shared.module";

import { ConfirmEmailComponent } from './confirm-email.component';

@NgModule({
  declarations: [
    ConfirmEmailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(confirmEmail)
  ]
})
export class ConfirmEmailModule { }
