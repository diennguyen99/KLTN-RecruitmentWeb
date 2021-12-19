import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { SkillName } from "../models/skill-name.model";
import { SkillNameParams } from "../params/skill-name.params";

@Injectable()
export class SkillNameService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getSkillsName(skillNameParams: SkillNameParams): Observable<Result<SkillName[]>> {
    let params = new HttpParams();
    if (skillNameParams.searchString)
      params = params.append('searchString', skillNameParams.searchString);
    if (skillNameParams.pageNumber)
      params = params.append('pageNumber', skillNameParams.pageNumber.toString());
    if (skillNameParams.pageSize)
      params = params.append('pageSize', skillNameParams.pageSize.toString());
    if (skillNameParams.orderBy)
      params = params.append('orderBy', skillNameParams.orderBy.toString());

    return this._http.get<Result<SkillName[]>>(this.baseUrl + 'skill', { params: params });
  }
}
