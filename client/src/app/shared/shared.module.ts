import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from "../material-ui/material-ui.module";
import { QuillModule} from "ngx-quill";
import { quillModulesConfig } from "./quill-editor.config";

// pipes
import { DataPropertyGetterPipe } from "./pipes/data-property-getter.pipe";

// components
import { TableComponent } from './components/table/table.component';
import { ViewCvDialogComponent } from './components/view-cv-dialog/view-cv-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    DataPropertyGetterPipe,
    TableComponent,
    ViewCvDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialUiModule,
    QuillModule.forRoot({
      modules: quillModulesConfig
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    TableComponent
  ]
})
export class SharedModule {}
