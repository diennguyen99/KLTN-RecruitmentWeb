import { Routes } from '@angular/router';
import { AboutUsComponent } from "./about-us.component";

export const aboutUsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AboutUsComponent
  }
];
