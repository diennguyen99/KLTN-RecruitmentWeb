import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from "./directives/has-role.directive";
import { ToastrModule } from "ngx-toastr";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from '@angular/common';

// interceptors
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";

// guards
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";

// services
import * as fromServices from './services';

@NgModule({
  declarations: [HasRoleDirective],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    DatePipe,
    ...fromServices.services,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  exports: [
    HasRoleDirective
  ]
})
export class CoreModule { }
