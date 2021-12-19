import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable(
  { providedIn: 'root' }
)
export class RoleGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedRoles = route.data['allowedRoles'];
    const isAuthorized = this._authService.isAuthorized('Role', allowedRoles);

    if (!isAuthorized) {
      this._toastrService.warning("You are not authorized to access the resource");
      this._router.navigateByUrl('access-denial').then(r => console.log(r));
    }

    return isAuthorized;
  }
}
