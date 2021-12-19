import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from "../../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;
  returnUrl!: string;
  isBeingLoggedIn: boolean = false;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toastrService: ToastrService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isBeingLoggedIn = true;
    this.loginForm.disable();

    this._authService.login(this.loginForm.value)
      .subscribe({
        next: (result) => {
          if (result.succeeded == true) {
            this._router.navigateByUrl(this.returnUrl)
          } else {
            this.loginForm.enable();
            this._toastrService.error(result.messages.toString(), 'Login Fail!')
          }
        },
        error: () => {
          this.loginForm.enable();
          this._toastrService.error('Login Fail!')
        }
      })
      .add(()=>this.isBeingLoggedIn = false);
  }

  fillCandidateCredentials() {
    this.loginForm = new FormGroup({
      email: new FormControl('candidate@gmail.com', Validators.email),
      password: new FormControl('string', Validators.required),
    });
  }

  fillEmployerCredentials() {
    this.loginForm = new FormGroup({
      email: new FormControl('employer@gmail.com', Validators.email),
      password: new FormControl('string', Validators.required),
    });
  }
}
