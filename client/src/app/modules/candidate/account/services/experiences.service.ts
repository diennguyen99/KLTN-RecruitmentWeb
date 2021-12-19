import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { Experience } from "../models/experience.model";

@Injectable()
export class ExperiencesService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfileExperiences(): Observable<Result<Experience[]>> {
    return this._http.get<Result<Experience[]>>(this.baseUrl + 'ProfileExperience');
  }

  getProfileExperienceById(id: number): Observable<Result<Experience>> {
    return this._http.get<Result<Experience>>(this.baseUrl + `ProfileExperience/${id}`);
  }

  addEditProfileExperience(data: any): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'ProfileExperience', data);
  }

  deleteProfileExperience(id: number): Observable<Result<number>> {
    return this._http.delete<Result<number>>(this.baseUrl + `ProfileExperience/${id}`);
  }
}
