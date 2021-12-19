import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ApplyJobDialogComponent } from "../components/apply-job-dialog/apply-job-dialog.component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Job } from "../../../../core/models/job.model";
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { Result } from "../../../../core/models/wrappers/Result";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

  private baseUrl = environment.apiURL;
  job$!: Observable<Result<Job>>;
  appliedJob: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.job$ = this._http.get<Result<Job>>(this.baseUrl + `Job/${params.get('slug')}`);

      this._http.get<Result<boolean>>(this.baseUrl + `Job/GetJobApplied?slug=${params.get('slug')}`).subscribe(response => {
        if (response.data) {
          this.appliedJob = true
        } else {
          this.appliedJob = false;
        }
      });
    })
  }

  openApplyJobDialog(jobId: number) {
    const dialogRef = this._dialog.open(ApplyJobDialogComponent, {
      width: '40%',
      data: jobId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appliedJob = true;
      }
    })
  }
}
