import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { JobExperience } from "../../../../../core/models/job-experience.model";
import { ToastrService } from "ngx-toastr";
import { JobExperienceService } from "../../services";

@Component({
  selector: 'app-add-job-experience-dialog',
  templateUrl: './add-job-experience-dialog.component.html'
})
export class AddJobExperienceDialogComponent implements OnInit {

  form!: FormGroup;
  titleForm: string = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: JobExperience,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _jobExperienceService: JobExperienceService
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
      this._jobExperienceService.addEditJobExperience(this.form.value).subscribe(result => {
        if(result.succeeded){
          this._toastrService.success('Saved success!');
        }else {
          this._toastrService.error('Saved fail!');
        }
      })
    }
  }
}
