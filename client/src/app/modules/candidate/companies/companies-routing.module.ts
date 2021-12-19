import { Routes } from '@angular/router';
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { CompaniesComponent } from "./companies.component";

export const companiesRoutes: Routes = [
  {
    path: ':slug',
    component: CompanyDetailComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: CompaniesComponent
  }
];
