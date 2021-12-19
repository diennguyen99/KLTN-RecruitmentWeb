import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProfileService } from "../services";

@Component({
  selector: 'app-change-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  isBeingSubmit: boolean = false;
  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _profileService: ProfileService,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm() {
    this.form = this._fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    this.isBeingSubmit = true;
    this.form.disable();
    this._profileService.changePasswordAccount(this.form.value).subscribe(response => {
      if (response.succeeded){
        this._toastrService.success('Change Password Success!');
        this.form.reset()
      } else {
        this._toastrService.error(response.messages.toString());
      }
      this.form.enable();
      this.isBeingSubmit = false;
    })
  }
}
