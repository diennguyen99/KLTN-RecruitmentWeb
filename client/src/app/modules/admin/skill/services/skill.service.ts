import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SkillParams } from "../params/skill.params";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Skill } from "../models/skill.model";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class SkillService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getSkills(skillParams: SkillParams): Observable<PaginatedResult<Skill>> {
    let params = new HttpParams();
    if (skillParams.searchString) {
      params = params.append('searchString', skillParams.searchString);
    }
    if (skillParams.pageNumber) {
      params = params.append('pageNumber', skillParams.pageNumber.toString());
    }
    if (skillParams.pageSize) {
      params = params.append('pageSize', skillParams.pageSize.toString());
    }
    if (skillParams.orderBy) {
      params = params.append('orderBy', skillParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<Skill>>(this.baseUrl + 'Skill', { params })
  }

  deleteSkill(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `Skill/${id}`);
  }

  addEditSkill(data: any): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'Skill', data);
  }
}
