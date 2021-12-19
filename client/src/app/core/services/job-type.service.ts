import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Result } from "src/app/core/models/wrappers/Result";
import { JobType } from "src/app/core/models/job-type.model";

@Injectable()
export class JobTypeService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getJobTypes(): Observable<Result<JobType[]>> {
    return this._http.get<Result<JobType[]>>(this.baseUrl + 'JobType');
  }

  addEditJobType(data: any): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'JobType', data);
  }

  deleteJobType(id: number): Observable<Result<number>> {
    return this._http.delete<Result<number>>(this.baseUrl + `JobType/${id}`);
  }
}
