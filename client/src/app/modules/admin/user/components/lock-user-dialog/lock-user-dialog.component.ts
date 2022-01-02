import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../../models/user.model";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../services";

@Component({
  selector: 'app-lock-user-dialog',
  templateUrl: './lock-user-dialog.component.html'
})
export class LockUserDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _userService: UserService
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.form = this._fb.group({
      isLock: [false, Validators.required]
    })
  }

  onSubmit() {
    if (this.form.valid){
      this._userService.lockUser(this.data.id, this.form.get('isLock')?.value ?? false).subscribe(result => {
        if(result.succeeded){
          this._toastrService.success('Lock Success!');
        }else {
          this._toastrService.error('Lock Fail!');
        }
      })
    }
  }
}
