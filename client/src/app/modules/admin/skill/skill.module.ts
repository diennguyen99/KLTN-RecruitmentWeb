import { NgModule } from '@angular/core';
import { SkillComponent } from './skill.component';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule} from "@angular/router";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// service
import * as fromServices from './services';

// components
import { skillRoutes } from './skill-routing.module';
import { AddSkillDialogComponent } from './components/add-skill-dialog/add-skill-dialog.component';

@NgModule({
  declarations: [
    SkillComponent,
    AddSkillDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(skillRoutes),
    MaterialUiModule
  ],
  providers: [...fromServices.services]
})
export class SkillModule { }
