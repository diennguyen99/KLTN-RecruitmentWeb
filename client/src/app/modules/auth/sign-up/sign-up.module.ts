import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { signUpRoutes } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(signUpRoutes),
    MaterialUiModule
  ]
})
export class SignUpModule { }
