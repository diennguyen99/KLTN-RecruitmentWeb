import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Result } from "../models/wrappers/Result";
import { Company } from "../models/company.model";

@Injectable()
export class CompanyService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  isCreatedCompany() {
    return this._http.get<Result<Company>>(this.baseUrl + 'Company/GetMyEmployer')
  }
}
