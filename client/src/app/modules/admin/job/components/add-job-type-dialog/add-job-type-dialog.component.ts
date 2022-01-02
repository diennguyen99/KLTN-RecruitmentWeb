import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { JobType } from "../../../../../core/models/job-type.model";
import { ToastrService } from "ngx-toastr";
import { JobTypeService } from "../../services";

@Component({
  selector: 'app-add-job-type-dialog',
  templateUrl: './add-job-type-dialog.component.html'
})
export class AddJobTypeDialogComponent implements OnInit {

  form!: FormGroup;
  titleForm: string = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: JobType,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _jobTypeService: JobTypeService
  ) { }

  ngOnInit(): void {
    this.initialForm();
    if (this.data && this.data.id) {
      this.titleForm = 'Edit';
      this.form.patchValue(this.data);
    }
  }

  initialForm() {
    this.form = this._fb.group({
      id: [0],
      name: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.form.valid){
      this._jobTypeService.addEditJobType(this.form.value).subscribe(result => {
        if(result.succeeded){
          this._toastrService.success('Saved success!');
        }else {
          this._toastrService.error('Saved fail!');
        }
      })
    }
  }
}
