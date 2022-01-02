import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { companyRoutes } from './company-routing.module';
import { SharedModule } from "../../../shared/shared.module";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromServices from './services';

// components
import { CompanyComponent } from './company.component';

@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(companyRoutes),
    MaterialUiModule,
  ],
  providers: [...fromServices.services]
})
export class CompanyModule { }
