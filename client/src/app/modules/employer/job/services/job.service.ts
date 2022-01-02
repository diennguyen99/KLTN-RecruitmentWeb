import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { JobParams } from "../params/job.params";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Job } from "../../../../core/models/job.model";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class JobService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getJobs(jobParams: JobParams): Observable<PaginatedResult<Job>>{
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

    return this._http.get<PaginatedResult<Job>>(this.baseUrl + 'Job', { params });
  }

  getJobById(id: number): Observable<Result<Job>>{
    return this._http.get<Result<Job>>(this.baseUrl + `Job/GetJobById`, { params: { id }});
  }

  createJob(data: any): Observable<Result<Job>> {
    return this._http.post<Result<Job>>(this.baseUrl + 'Job', data);
  }

  removeJob(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `Job/${id}`);
  }
}
