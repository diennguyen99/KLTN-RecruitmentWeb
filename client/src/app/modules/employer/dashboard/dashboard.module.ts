import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from './dashboard-routing.module';
import { SharedModule } from "../../../shared/shared.module";
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
