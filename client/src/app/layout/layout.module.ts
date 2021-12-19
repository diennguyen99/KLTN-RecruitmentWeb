import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { SharedModule } from '../shared/shared.module';
import { HomeLayoutModule } from './layouts/home-layout/home-layout.module';
import { CandidateLayoutModule } from './layouts/candidate-layout/candidate-layout.module';

const layoutModules = [
  AuthLayoutModule,
  HomeLayoutModule,
  CandidateLayoutModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [SharedModule, ...layoutModules],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
