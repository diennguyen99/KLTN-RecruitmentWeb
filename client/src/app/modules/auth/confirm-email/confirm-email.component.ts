import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../core/services";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent implements OnInit {

  title: string = ''

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      const userId = params['userId'] ?? null;
      const code = params['code'] ?? null;

      if (userId && code){
        this._authService.confirmEmail(userId, code).subscribe(result => {
          if(result.succeeded) {
            this.title = 'Verify Email Success';
          } else {
            this.title = 'Verify Email Fail'
          }
        })
      } else {
        this._router.navigate(['sign-up']);
      }
    })
  }

}
