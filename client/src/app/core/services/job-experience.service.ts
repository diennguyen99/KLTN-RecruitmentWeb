import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Result } from "src/app/core/models/wrappers/Result";
import { JobExperience } from "src/app/core/models/job-experience.model";

@Injectable()
export class JobExperienceService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getJobExperiences(): Observable<Result<JobExperience[]>> {
    return this._http.get<Result<JobExperience[]>>(this.baseUrl + 'JobExperience');
  }

  addEditJobExperience(data: any): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'JobExperience', data);
  }

  deleteJobExperience(id: number): Observable<Result<number>> {
    return this._http.delete<Result<number>>(this.baseUrl + `JobExperience/${id}`);
  }
}
