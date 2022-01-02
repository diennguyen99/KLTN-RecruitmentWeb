import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ApplyJobDialogComponent } from "../components/apply-job-dialog/apply-job-dialog.component";
import { Observable } from "rxjs";
import { Job } from "../../../../core/models/job.model";
import { ActivatedRoute } from "@angular/router";
import { Result } from "../../../../core/models/wrappers/Result";
import { JobsService } from "../servies/jobs.service";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

  job$!: Observable<Result<Job>>;
  isAppliedJob: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _jobsService: JobsService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const slugParam = params.get('slug') || '';
      this.job$ = this._jobsService.findJobBySlug(slugParam);
      this._jobsService.isJobApplied(slugParam).subscribe((response) => {
        if (response.data) this.isAppliedJob = true;
        else this.isAppliedJob = false;
      })
    })
  }

  openApplyJobDialog(jobId: number) {
    const dialogRef = this._dialog.open(ApplyJobDialogComponent, {
      width: '40%',
      data: jobId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAppliedJob = true;
      }
    })
  }
}
