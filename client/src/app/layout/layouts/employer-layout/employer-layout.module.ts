import { NgModule } from '@angular/core';
import { EmployerLayoutComponent } from './employer-layout.component';
import { SharedModule } from "../../../shared/shared.module";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    EmployerLayoutComponent,
    ToolbarComponent
  ],
  exports: [
    EmployerLayoutComponent
  ],
  imports: [
    SharedModule,
    MaterialUiModule,
    RouterModule
  ]
})
export class EmployerLayoutModule { }
