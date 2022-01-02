import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CV } from "../../../../../core/models/cv.model";
import { JobsService } from "../../servies/jobs.service";

@Component({
  selector: 'app-apply-job-dialog',
  templateUrl: './apply-job-dialog.component.html'
})
export class ApplyJobDialogComponent implements OnInit {

  form!: FormGroup;
  cvFile!: File;
  cvs: CV[] = [];

  constructor(
    public dialogRef: MatDialogRef<ApplyJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _idJob: number,
    private readonly _fb: FormBuilder,
    private readonly _jobsService: JobsService,
    private readonly _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initialForm();

    this._jobsService.getCVsByCurrentUser().subscribe(response => {
      if (response.succeeded)
        this.cvs = response.data;
    });
  }

  private initialForm() {
    this.form = this._fb.group({
      myCvOnline: [false],
      selectedCV: [0],
      description: ['Hello Company!'],
    })
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    this.cvFile = <File>files[0];
  }

  onSubmit() {
    if (this.form.valid) {
      // CV NEW Upload
      if (this.cvFile) {
        const formData = new FormData();
        formData.append('Title','test');
        formData.append("UploadRequest.FileName", this.cvFile.name);
        formData.append("UploadRequest.Extension", `.${this.cvFile.name.split('.')[1]}`);
        formData.append("UploadRequest.File", this.cvFile, this.cvFile.name);

        this._jobsService.uploadCV(formData).subscribe((response) => {
          if (response.succeeded === true){
            this.applyJob(false, response.data);
          } else {
            this._toastrService.error("Apply Fail!")
          }
        })
      }
    }

    if (!this.cvFile) {
      if (!this.form.get('myCvOnline')?.value && this.form.get('selectedCV')?.value && this.form.get('selectedCV')?.value != 0){
        const selectedCvId = parseInt(this.form.get('selectedCV')?.value, 10);
        this.applyJob(false, selectedCvId);
      }

      if (this.form.get('myCvOnline')?.value){
        this.applyJob(true, 0);
      }
    }
  }

  private applyJob(myCvOnline: boolean, cvId: number) {
    if (this._idJob && this._idJob != 0) {
      const data = {
        myCvOnline,
        cvId,
        description: this.form.get('description')?.value || '',
        jobId: this._idJob
      }

      this._jobsService.applyJob(data).subscribe((response) => {
        if (response.succeeded === true){
          this._toastrService.success("Apply Success!")
          this.dialogRef.close(true);
        } else {
          this._toastrService.error("Apply Fail!")
        }
      })
    }
  }
}
