import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', [Validators.minLength(6)]),
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(6)]),
      phoneNumber: new FormControl('', [Validators.minLength(10)]),
      roleName: new FormControl('Candidate', Validators.required)
    });
  }

  onSubmit() {
    this._authService.register(this.signUpForm.value).subscribe(result => {
      if(result.succeeded) {
        this._toastrService.success('Sign Up Success. Check your email for account activation.');
        this._router.navigateByUrl('/');
      } else {
        this._toastrService.error(result.messages.toString());
      }
    })
  }
}
