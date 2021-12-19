import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { Education } from "../models/education.model";

@Injectable()
export class EducationsService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfileEducations(): Observable<Result<Education[]>> {
    return this._http.get<Result<Education[]>>(this.baseUrl + 'ProfileEducation');
  }

  addEditProfileEducation(data: any): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'ProfileEducation', data);
  }

  deleteProfileEducation(id: number): Observable<Result<number>> {
    return this._http.delete<Result<number>>(this.baseUrl + `ProfileEducation/${id}`);
  }
}
