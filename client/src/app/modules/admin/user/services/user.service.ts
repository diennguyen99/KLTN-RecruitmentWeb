import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserParams } from "../params/user.params";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { User } from "../models/user.model";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class UserService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getUsers(userParams: UserParams): Observable<PaginatedResult<User>> {
    let params = new HttpParams();
    if (userParams.searchString) {
      params = params.append('searchString', userParams.searchString);
    }
    if (userParams.pageNumber) {
      params = params.append('pageNumber', userParams.pageNumber.toString());
    }
    if (userParams.pageSize) {
      params = params.append('pageSize', userParams.pageSize.toString());
    }
    if (userParams.orderBy) {
      params = params.append('orderBy', userParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<User>>(this.baseUrl + 'User', { params })
  }

  lockUser(userId: string, isLock: boolean): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'User', {
      userId,
      isLock
    });
  }
}
