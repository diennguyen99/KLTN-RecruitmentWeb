import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { aboutUsRoutes } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    RouterModule.forChild(aboutUsRoutes),
    SharedModule
  ]
})
export class AboutUsModule { }
