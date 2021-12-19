import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Result } from "../../../../core/models/wrappers/Result";
import { Profile } from "../models/profile.model";

@Injectable()
export class ProfileService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfile(): Observable<Result<Profile>> {
    return this._http.get<Result<Profile>>(this.baseUrl + 'account/GetProfile');
  }

  saveProfile(request: any): Observable<Result<Profile>> {
    return this._http.put<Result<Profile>>(this.baseUrl + 'account/UpdateProfile', request);
  }

  saveProfileSocial(request: any): Observable<Result<Profile>> {
    return this._http.put<Result<Profile>>(this.baseUrl + 'account/UpdateProfileSoicial', request);
  }

  changePasswordAccount(request: any): Observable<Result<number>> {
    return this._http.put<Result<number>>(this.baseUrl + 'account/ChangePassword', request);
  }
}
