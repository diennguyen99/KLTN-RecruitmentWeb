import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Job } from "../../../../core/models/job.model";
import { JobParams } from "../params/job.params";

@Injectable()
export class JobService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getJobs(jobParams: JobParams): Observable<PaginatedResult<Job>> {
    let params = new HttpParams();
    if (jobParams.searchString) {
      params = params.append('searchString', jobParams.searchString);
    }
    if (jobParams.pageNumber) {
      params = params.append('pageNumber', jobParams.pageNumber.toString());
    }
    if (jobParams.pageSize) {
      params = params.append('pageSize', jobParams.pageSize.toString());
    }
    if (jobParams.orderBy) {
      params = params.append('orderBy', jobParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<Job>>(this.baseUrl + 'Job', { params })
  }
}
