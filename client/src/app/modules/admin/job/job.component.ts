import { Component, OnInit } from '@angular/core';
import {PaginatedResult} from "../../../core/models/wrappers/PaginatedResult";
import {TableColumn} from "../../../shared/components/table/table-column";
import {Job} from "../../../core/models/job.model";
import {JobParams} from "./params/job.params";
import {JobService} from "./services";
import {PaginatedFilter} from "../../../core/models/filter/paginated-filter";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

  jobs!: PaginatedResult<Job>;
  jobColumns: TableColumn[] = [];
  jobParams = new JobParams();
  searchString: string = '';

  constructor(
    private readonly _jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJobs();
    this.initialColumns();
  }

  getJobs() {
    this._jobService.getJobs(this.jobParams).subscribe(result => {
      this.jobs = result;
    })
  }

  initialColumns(): void {
    this.jobColumns = [
      { name: 'Title', dataKey: 'title', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Company', dataKey: 'companyName', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Expired', dataKey: 'dateEnd', isSortTable: true, isShowTable: true, style:'expired' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'date' }
    ]
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
