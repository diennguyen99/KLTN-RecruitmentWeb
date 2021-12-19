import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { companiesRoutes } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { SharedModule } from "../../../shared/shared.module";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";


@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyDetailComponent
  ],
  imports: [
    RouterModule.forChild(companiesRoutes),
    SharedModule,
    MaterialUiModule
  ]
})
export class CompaniesModule { }
