import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { Summary } from "../models/summary.model";

@Injectable()
export class SummaryService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfileSummary(): Observable<Result<Summary>> {
    return this._http.get<Result<Summary>>(this.baseUrl + 'ProfileSummary');
  }

  addEditProfileSummary(data: any): Observable<Result<Summary>> {
    return this._http.post<Result<Summary>>(this.baseUrl + 'ProfileSummary', data);
  }
}
