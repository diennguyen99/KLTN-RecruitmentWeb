import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";
import { environment } from "../../../../../environments/environment";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { AppliedJob } from "../../../../core/models/applied-job.model";
import { ApplicantParams } from "../params/applicant.params";

@Injectable()
export class ApplicantService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getApplicants(applicantParams: ApplicantParams): Observable<PaginatedResult<AppliedJob>> {
    let params = new HttpParams();

    if (applicantParams.pageNumber) {
      params = params.append('pageNumber', applicantParams.pageNumber.toString());
    }
    if (applicantParams.pageSize) {
      params = params.append('pageSize', applicantParams.pageSize.toString());
    }
    if (applicantParams.jobTitle) {
      params = params.append('jobTitle', applicantParams.jobTitle.toString());
    }

    return this._http.get<PaginatedResult<AppliedJob>>(this.baseUrl + 'AppliedJob/GetAppliedJobOfEmployer', { params });
  }
}
