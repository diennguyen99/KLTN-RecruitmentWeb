import { Component, OnInit } from '@angular/core';
import { Sort } from "@angular/material/sort";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";

import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { JobType } from "../../../../core/models/job-type.model";
import { TableColumn } from "../../../../shared/components/table/table-column";
import { JobTypeParams } from "../params/job-type.params";
import { JobTypeService } from "../services";
import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";
import { AddJobTypeDialogComponent } from "../components/add-job-type-dialog/add-job-type-dialog.component";

@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html'
})
export class JobTypeComponent implements OnInit {

  jobTypes!: PaginatedResult<JobType>;
  jobTypeColumns: TableColumn[] = [];
  jobTypeParams = new JobTypeParams();
  searchString: string = '';

  constructor(
    private readonly _jobTypeService: JobTypeService,
    private readonly _toastrService: ToastrService,
    private readonly _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getJobTypes();
    this.initialColumns();
  }

  getJobTypes() {
    this._jobTypeService.getJobTypes(this.jobTypeParams).subscribe(result => {
      this.jobTypes = result;
    })
  }

  initialColumns(): void {
    this.jobTypeColumns = [
      { name: 'Name', dataKey: 'name', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'date' },
      { name: 'Action', dataKey: 'action', position: 'right', style: 'none' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.jobTypeParams.pageNumber = event.pageNumber;
    this.jobTypeParams.pageSize = event.pageSize;
    this.getJobTypes();
  }

  openForm(jobType?: JobType): void {
    const dialogRef = this._dialog.open(AddJobTypeDialogComponent, {
      data: jobType,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getJobTypes();
      }
    });
  }

  remove($event: string): void {
    const idRemove = parseInt($event, 10);

    this._jobTypeService.deleteJobType(idRemove).subscribe(result => {
      if(result.succeeded) {
        this.getJobTypes();
        this._toastrService.success('Delete Success');
      } else {
        this._toastrService.error(result.messages.toString());
      }
    });
  }

  sort($event: Sort): void {
    this.jobTypeParams.orderBy = $event.active + ' ' + $event.direction;
    this.getJobTypes();
  }

  filter($event: string): void {
    this.jobTypeParams.searchString = $event.trim().toLocaleLowerCase();
    this.jobTypeParams.pageNumber = 0;
    this.jobTypeParams.pageSize = 0;
    this.getJobTypes();
  }

  reload(): void {
    this.jobTypeParams.searchString = '';
    this.jobTypeParams.pageNumber = 0;
    this.jobTypeParams.pageSize = 0;
    this.getJobTypes();
  }
}
