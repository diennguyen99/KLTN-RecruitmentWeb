import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { signInRoutes } from './sign-in.routing';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    RouterModule.forChild(signInRoutes),
    SharedModule,
    MaterialUiModule
  ],
})
export class SignInModule {}
