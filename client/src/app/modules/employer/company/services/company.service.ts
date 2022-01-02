import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Result} from "../../../../core/models/wrappers/Result";
import {Company} from "../../../../core/models/company.model";

@Injectable()
export class CompanyService {
  private baseUrl = environment.apiURL;

  constructor(
    private readonly _http: HttpClient
  ) {}

  getCompany(): Observable<Result<Company>> {
    return this._http.get<Result<Company>>(this.baseUrl + 'Company/GetMyEmployer');
  }

  updateCompany(data: any): Observable<Result<number>> {
    return this._http.post<Result<number>>(this.baseUrl + 'Company', data);
  }
}
