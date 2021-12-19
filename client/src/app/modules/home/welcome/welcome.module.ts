import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { welcomeRoutes } from './welcome.routing';
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    RouterModule.forChild(welcomeRoutes),
    SharedModule,
    MaterialUiModule
  ],
})
export class WelcomeModule {}
