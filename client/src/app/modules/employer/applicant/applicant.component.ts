import { Component, OnInit } from '@angular/core';
import { TableColumn } from "../../../shared/components/table/table-column";
import { ApplicantService } from "./services";
import { PaginatedFilter } from "../../../core/models/filter/paginated-filter";
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { AppliedJob } from "../../../core/models/applied-job.model";
import { ApplicantParams } from "./params/applicant.params";

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
})
export class ApplicantComponent implements OnInit {

  applicants!: PaginatedResult<AppliedJob>;
  applicantColumns: TableColumn[] = [];
  applicantParams = new ApplicantParams();
  jobId: number = 0;

  constructor(
    private readonly applicantService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.getApplicants();
    this.initialColumns();
  }

  private getApplicants() {
    this.applicantService.getApplicants(this.applicantParams).subscribe(result => {
      this.applicants = result;
    })
  }

  private initialColumns() {
    this.applicantColumns = [
      { name: 'Job Title', dataKey: 'jobTitle', isShowTable: true, style: 'none' },
      { name: 'Apply At', dataKey: 'createdOn', isShowTable: true, style: 'date', position: "right" },
      { name: 'CV', dataKey: 'cvUrl', isShowTable: true, style: 'download', position: "right" }
    ]
  }

  remove($event: string): void {
    console.log('Remove')
  }

  pageChanged(event: PaginatedFilter): void {
    this.applicantParams.pageNumber = event.pageNumber;
    this.applicantParams.pageSize = event.pageSize;
    this.getApplicants();
  }

  filter($event: string): void {
    this.applicantParams.jobTitle = $event.trim().toLocaleLowerCase();
    this.applicantParams.pageNumber = 0;
    this.applicantParams.pageSize = 0;
    this.getApplicants();
  }

  reload(): void {
    this.applicantParams.jobTitle = '';
    this.applicantParams.pageNumber = 0;
    this.applicantParams.pageSize = 0;
    this.getApplicants();
  }
}
