import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, publishLast, refCount } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Result } from "../../../../core/models/wrappers/Result";
import { tap } from "rxjs/operators";

@Injectable()
export class AppliedJobPagerService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfileEducations(paramsQuery: any): Observable<PaginatedResult<any>> {
    return this._http.get<PaginatedResult<any>>(
      this.baseUrl + 'AppliedJob/GetAppliedJobOfCandidate', { params: paramsQuery });
  }
}
