import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(homeRoutes),
    SharedModule,
    MaterialUiModule
  ]
})
export class HomeModule {}
