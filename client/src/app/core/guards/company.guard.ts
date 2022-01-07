import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { map, Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { CompanyService } from "../services";
import { Result } from "../models/wrappers/Result";
import { Company } from "../models/company.model";

@Injectable()
export class CompanyGuard implements CanActivate {

  constructor(
    private readonly _companyService: CompanyService,
    private readonly _toastrService: ToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return  this._companyService.isCreatedCompany().pipe(
      map((response: Result<Company>) => {
        if (response.succeeded && response.data?.id) {
          return true;
        }

        this._toastrService.warning('You have not created a company! Please create company to use this feature.')
        this.router.navigate(['/employer/company']);
        return false;
      }),
      catchError((error) => {
        this.router.navigate(['/employer/company']);
        return of(false);
      })
    )
  }
}
