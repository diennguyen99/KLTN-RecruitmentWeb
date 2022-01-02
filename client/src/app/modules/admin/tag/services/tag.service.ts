import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TagParams } from "../params/tag.params";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Tag } from "../../../../core/models/tag.model";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class TagService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getTags(tagParams: TagParams): Observable<PaginatedResult<Tag>> {
    let params = new HttpParams();
    if (tagParams.searchString) {
      params = params.append('searchString', tagParams.searchString);
    }
    if (tagParams.pageNumber) {
      params = params.append('pageNumber', tagParams.pageNumber.toString());
    }
    if (tagParams.pageSize) {
      params = params.append('pageSize', tagParams.pageSize.toString());
    }
    if (tagParams.orderBy) {
      params = params.append('orderBy', tagParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<Tag>>(this.baseUrl + 'Tag', { params })
  }

  deleteTag(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `Tag/${id}`);
  }

  addEditTag(data: any): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'Tag', data);
  }
}
