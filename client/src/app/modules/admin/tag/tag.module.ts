import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { tagRoutes } from './tag-routing.module';
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromServices from './services';

// components
import { TagComponent } from './tag.component';
import { AddTagDialogComponent } from './components/add-tag-dialog/add-tag-dialog.component';

@NgModule({
  declarations: [
    TagComponent,
    AddTagDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(tagRoutes),
    MaterialUiModule
  ],
  providers: [...fromServices.services]
})
export class TagModule { }
