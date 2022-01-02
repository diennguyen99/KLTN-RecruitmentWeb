import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { JobType } from "../../../../core/models/job-type.model";
import { JobTypeParams } from "../params/job-type.params";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class JobTypeService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getJobTypes(jobTypeParams: JobTypeParams): Observable<PaginatedResult<JobType>> {
    let params = new HttpParams();
    if (jobTypeParams.searchString) {
      params = params.append('searchString', jobTypeParams.searchString);
    }
    if (jobTypeParams.pageNumber) {
      params = params.append('pageNumber', jobTypeParams.pageNumber.toString());
    }
    if (jobTypeParams.pageSize) {
      params = params.append('pageSize', jobTypeParams.pageSize.toString());
    }
    if (jobTypeParams.orderBy) {
      params = params.append('orderBy', jobTypeParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<JobType>>(this.baseUrl + 'JobType', { params })
  }

  deleteJobType(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `JobType/${id}`);
  }

  addEditJobType(data: any): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'JobType', data);
  }
}
