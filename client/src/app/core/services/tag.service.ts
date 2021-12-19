import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Result } from "../models/wrappers/Result";
import { Tag } from "../models/tag.model";
import { TagParams } from "../params/tag.params";

@Injectable()
export class TagService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getTags(tagParams: TagParams): Observable<Result<Tag[]>> {
    let params = new HttpParams();
    if (tagParams.searchString)
      params = params.append('searchString', tagParams.searchString);
    if (tagParams.pageNumber)
      params = params.append('pageNumber', tagParams.pageNumber.toString());
    if (tagParams.pageSize)
      params = params.append('pageSize', tagParams.pageSize.toString());
    if (tagParams.orderBy)
      params = params.append('orderBy', tagParams.orderBy.toString());

    return this._http.get<Result<Tag[]>>(this.baseUrl + 'Tag/GetPagedAll', { params: params });
  }
}
