import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { JobTag } from "../../../../core/models/job-tag.model";
import { Job } from "../../../../core/models/job.model";
import { CV } from "../../../../core/models/cv.model";

@Injectable()
export class JobsService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  findJobs(paramsQuery: any): Observable<PaginatedResult<JobTag>> {
    return this._http.get<PaginatedResult<JobTag>>(this.baseUrl + 'JobTag', { params: paramsQuery });
  }

  findJobBySlug(params: string): Observable<Result<Job>> {
    return this._http.get<Result<Job>>(this.baseUrl + `Job/${params}`);
  }

  isJobApplied(params: string): Observable<Result<boolean>> {
    return this._http.get<Result<boolean>>(this.baseUrl + `Job/GetJobApplied?slug=${params}`);
  }

  getCVsByCurrentUser(): Observable<Result<CV[]>> {
    return this._http.get<Result<CV[]>>(this.baseUrl + 'CV');
  }

  uploadCV(formData: FormData): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'CV', formData);
  }

  applyJob(data: any) {
    return this._http.post<Result<any>>(this.baseUrl + 'AppliedJob', data);
  }
}
