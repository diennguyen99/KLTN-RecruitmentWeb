import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";
import { AdminLayoutComponent } from './admin-layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    ToolbarComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MaterialUiModule
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
