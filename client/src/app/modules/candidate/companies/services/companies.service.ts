import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Company } from "../../../../core/models/company.model";
import { Result } from "../../../../core/models/wrappers/Result";

@Injectable()
export class CompaniesService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  findCompanies(paramsQuery: any): Observable<PaginatedResult<Company>> {
    return this._http.get<PaginatedResult<Company>>(this.baseUrl + 'Company', {params: paramsQuery});
  }


  findCompanyBySlug(params: any): Observable<any> {
    return this._http.get<Result<Company>>(this.baseUrl + `Company/${params}`);
  }
}
