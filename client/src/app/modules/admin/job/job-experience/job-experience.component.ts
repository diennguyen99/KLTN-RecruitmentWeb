import { Component, OnInit } from '@angular/core';
import { Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { JobExperienceService } from "../services";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { JobExperience } from "../../../../core/models/job-experience.model";
import { TableColumn } from "../../../../shared/components/table/table-column";
import { JobExperienceParams } from "../params/job-experience.params";
import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";
import { AddJobExperienceDialogComponent } from "../components/add-job-experience-dialog/add-job-experience-dialog.component";

@Component({
  selector: 'app-job-experience',
  templateUrl: './job-experience.component.html'
})
export class JobExperienceComponent implements OnInit {

  jobExperiences!: PaginatedResult<JobExperience>;
  jobExperienceColumns: TableColumn[] = [];
  jobExperienceParams = new JobExperienceParams();
  searchString: string = '';

  constructor(
    private readonly _jobExperienceService: JobExperienceService,
    private readonly _dialog: MatDialog,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobExperiences();
    this.initialColumns();
  }

  getJobExperiences() {
    this._jobExperienceService.getJobExperiences(this.jobExperienceParams).subscribe(result => {
      this.jobExperiences = result;
    })
  }

  initialColumns(): void {
    this.jobExperienceColumns = [
      { name: 'Name', dataKey: 'name', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Action', dataKey: 'action', position: 'right', style: 'none' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.jobExperienceParams.pageNumber = event.pageNumber;
    this.jobExperienceParams.pageSize = event.pageSize;
    this.getJobExperiences();
  }

  openForm(jobExperience?: JobExperience): void {
    const dialogRef = this._dialog.open(AddJobExperienceDialogComponent, {
      data: jobExperience,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getJobExperiences();
      }
    });
  }

  remove($event: string): void {
    const idRemove = parseInt($event, 10);

    this._jobExperienceService.deleteJobExperience(idRemove).subscribe(result => {
      if(result.succeeded) {
        this.getJobExperiences();
        this._toastrService.success('Delete Success');
      } else {
        this._toastrService.error(result.messages.toString());
      }
    });
  }

  sort($event: Sort): void {
    this.jobExperienceParams.orderBy = $event.active + ' ' + $event.direction;
    this.getJobExperiences();
  }

  filter($event: string): void {
    this.jobExperienceParams.searchString = $event.trim().toLocaleLowerCase();
    this.jobExperienceParams.pageNumber = 0;
    this.jobExperienceParams.pageSize = 0;
    this.getJobExperiences();
  }

  reload(): void {
    this.jobExperienceParams.searchString = '';
    this.jobExperienceParams.pageNumber = 0;
    this.jobExperienceParams.pageSize = 0;
    this.getJobExperiences();
  }
}
