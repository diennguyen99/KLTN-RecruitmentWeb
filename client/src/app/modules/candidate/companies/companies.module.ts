import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { companiesRoutes } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { SharedModule } from "../../../shared/shared.module";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromServices from './services';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyDetailComponent
  ],
  imports: [
    RouterModule.forChild(companiesRoutes),
    SharedModule,
    MaterialUiModule
  ],
  providers: [...fromServices.services]
})
export class CompaniesModule { }
