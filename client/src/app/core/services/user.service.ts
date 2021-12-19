import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Result} from "../models/wrappers/Result";
import {Observable} from "rxjs";
import {UserProfile} from "../models/identity/user-profile";

@Injectable()
export class UserService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfile(): Observable<Result<UserProfile>> {
    return this._http.get<Result<UserProfile>>(this.baseUrl + 'account/GetProfile');
  }

  saveProfileSocial(request: any): Observable<Result<UserProfile>> {
    return this._http.put<Result<UserProfile>>(this.baseUrl + 'account/UpdateProfileSoicial', request);
  }
}
