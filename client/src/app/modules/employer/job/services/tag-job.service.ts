import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Result } from "../../../../core/models/wrappers/Result";
import { Tag } from "../../../../core/models/tag.model";
import { JobTag } from "../../../../core/models/job-tag.model";

@Injectable()
export class TagJobService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getTags(): Observable<Result<Tag[]>> {
    let params = new HttpParams();
    params = params.append('pageNumber', 1);
    params = params.append('pageSize', 200);
    return this._http.get<Result<Tag[]>>(this.baseUrl + 'Tag', { params });
  }

  getJobTagsById(id: number): Observable<Result<JobTag[]>> {
    return this._http.get<Result<JobTag[]>>(this.baseUrl + `JobTag/GetAllByJobId?jobId=${id}`);
  }

  addEditTagJob(data: any): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'JobTag', data)
  }

  deleteTagJob(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `JobTag/${id}`);
  }
}
