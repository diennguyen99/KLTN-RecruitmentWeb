import { Component, OnInit } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { AppliedJobPagerService } from "../services";
import { Observable } from "rxjs";

@Component({
  selector: 'app-applied-job',
  templateUrl: './applied-job.component.html',
})
export class AppliedJobComponent implements OnInit {

  // paging
  currentPage: number = 1;
  pageSize: number = 2;
  totalCount: number = 0;
  totalPages: number = 0;

  appliedJobs: any[] = [];

  constructor(
    private readonly _appliedJobService: AppliedJobPagerService
  ) { }

  ngOnInit(): void {
    this.getAppliedJobs();
  }

  onPaginateChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.getAppliedJobs();
  }

  getAppliedJobs() {
    let paramsQuery = new HttpParams();
    paramsQuery = paramsQuery.append('pageNumber', this.currentPage);
    paramsQuery = paramsQuery.append('pageSize', this.pageSize);

    this._appliedJobService.getProfileEducations(paramsQuery).subscribe((response) => {
      this.appliedJobs = response.data;
      this.currentPage = response.currentPage;
      this.totalCount = response.totalCount;
      this.totalPages = response.totalPages;
    })
  }
}
