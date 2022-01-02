import { Component, OnInit } from '@angular/core';
import { Sort } from "@angular/material/sort";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Job } from "../../../../core/models/job.model";
import { TableColumn } from "../../../../shared/components/table/table-column";
import { JobParams } from "../params/job.params";
import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";
import { JobService } from "../services";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
})
export class JobListComponent implements OnInit {

  jobs!: PaginatedResult<Job>;
  jobColumns: TableColumn[] = [];
  jobParams = new JobParams();
  searchString: string = '';

  constructor(
    private readonly _jobsService: JobService,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobs();
    this.initialColumns();
  }

  getJobs(): void {
    this._jobsService.getJobs(this.jobParams).subscribe(result => {
      this.jobs = result;
    })
  }

  initialColumns(): void {
    this.jobColumns = [
      { name: 'Title', dataKey: 'title', isSortTable: true, isShowTable: true, style:'none' },
      { name: 'Expired', dataKey: 'dateEnd', isSortTable: true, isShowTable: true, style:'expired', position: 'right' },
      { name: 'Action', dataKey: 'action', position: 'right', style:'none' },
    ]
  }

  remove($event: string): void {
    const idRemove = parseInt($event, 10);
    this._jobsService.removeJob(idRemove).subscribe(result => {
      if(result.succeeded) {
        this._toastrService.success('Delete Success!');
      } else {
        this._toastrService.error('Delete Fail!');
      }
    })
  }

  pageChanged(event: PaginatedFilter): void {
    this.jobParams.pageNumber = event.pageNumber;
    this.jobParams.pageSize = event.pageSize;
    this.getJobs();
  }

  sort($event: Sort): void {
    this.jobParams.orderBy = $event.active + ' ' + $event.direction;
    this.getJobs();
  }

  filter($event: string): void {
    this.jobParams.searchString = $event.trim().toLocaleLowerCase();
    this.jobParams.pageNumber = 0;
    this.jobParams.pageSize = 0;
    this.getJobs();
  }

  reload(): void {
    this.jobParams.searchString = '';
    this.jobParams.pageNumber = 0;
    this.jobParams.pageSize = 0;
    this.getJobs();
  }
}
