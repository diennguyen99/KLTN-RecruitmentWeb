import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidateLayoutComponent } from './candidate-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialUiModule } from "../../../material-ui/material-ui.module";

@NgModule({
  declarations: [CandidateLayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    RouterModule,
    SharedModule,
    MaterialUiModule
  ],
  exports: [CandidateLayoutComponent],
})
export class CandidateLayoutModule {}
