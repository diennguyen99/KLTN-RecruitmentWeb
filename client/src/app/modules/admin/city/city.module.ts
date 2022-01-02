import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { cityRoutes } from "./city.routing";
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

// services
import * as fromCities from './services';

// components
import { CityComponent } from './city.component';
import { AddCityDialogComponent } from './components/add-city-dialog/add-city-dialog.component';

@NgModule({
  declarations: [
    CityComponent,
    AddCityDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(cityRoutes),
    MaterialUiModule
  ],
  providers: [...fromCities.services]
})
export class CityModule { }
