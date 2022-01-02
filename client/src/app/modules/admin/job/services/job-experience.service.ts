import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { JobExperience } from "../../../../core/models/job-experience.model";
import { JobExperienceParams } from "../params/job-experience.params";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class JobExperienceService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getJobExperiences(jobExperienceParams: JobExperienceParams): Observable<PaginatedResult<JobExperience>> {
    let params = new HttpParams();
    if (jobExperienceParams.searchString) {
      params = params.append('searchString', jobExperienceParams.searchString);
    }
    if (jobExperienceParams.pageNumber) {
      params = params.append('pageNumber', jobExperienceParams.pageNumber.toString());
    }
    if (jobExperienceParams.pageSize) {
      params = params.append('pageSize', jobExperienceParams.pageSize.toString());
    }
    if (jobExperienceParams.orderBy) {
      params = params.append('orderBy', jobExperienceParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<JobExperience>>(this.baseUrl + 'JobExperience', { params })
  }

  deleteJobExperience(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `JobExperience/${id}`);
  }

  addEditJobExperience(data: any): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'JobExperience', data);
  }
}
