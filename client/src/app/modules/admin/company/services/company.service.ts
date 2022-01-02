import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {PaginatedResult} from "../../../../core/models/wrappers/PaginatedResult";
import {Company} from "../../../../core/models/company.model";
import {CompanyParams} from "../params/company.params";

@Injectable()
export class CompanyService {

  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getCompanies(companyParams: CompanyParams): Observable<PaginatedResult<Company>> {

    let params = new HttpParams();
    if (companyParams.searchString) {
      params = params.append('searchString', companyParams.searchString);
    }
    if (companyParams.pageNumber) {
      params = params.append('pageNumber', companyParams.pageNumber.toString());
    }
    if (companyParams.pageSize) {
      params = params.append('pageSize', companyParams.pageSize.toString());
    }
    if (companyParams.orderBy) {
      params = params.append('orderBy', companyParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<Company>>(this.baseUrl + 'Company', { params })
  }
}
