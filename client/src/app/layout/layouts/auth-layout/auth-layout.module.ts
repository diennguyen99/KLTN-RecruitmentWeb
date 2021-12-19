import { NgModule } from '@angular/core';
import { AuthLayoutComponent } from './auth-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [RouterModule, SharedModule],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
