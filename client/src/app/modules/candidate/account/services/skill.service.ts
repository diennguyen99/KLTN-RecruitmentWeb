import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { Skill } from "../models/skill.model";

@Injectable()
export class SkillService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfileSkills(): Observable<Result<Skill[]>> {
    return this._http.get<Result<Skill[]>>(this.baseUrl + 'ProfileSkill');
  }

  getProfileSkillById(id: number): Observable<Result<Skill>> {
    return this._http.get<Result<Skill>>(this.baseUrl + `ProfileSkill/${id}`);
  }

  addEditProfileSkill(data: any): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'ProfileSkill', data);
  }

  deleteProfileSkill(id: number): Observable<Result<number>> {
    return this._http.delete<Result<number>>(this.baseUrl + `ProfileSkill/${id}`);
  }
}
