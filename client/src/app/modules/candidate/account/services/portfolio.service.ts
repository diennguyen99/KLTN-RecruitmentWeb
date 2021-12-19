import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../core/models/wrappers/Result";
import { Portfolio } from "../models/portfolio.model";

@Injectable()
export class PortfolioService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getProfilePortfolios(): Observable<Result<Portfolio[]>> {
    return this._http.get<Result<Portfolio[]>>(this.baseUrl + 'ProfileProject');
  }

  addEditProfilePortfolio(data: any): Observable<Result<Portfolio>> {
    return this._http.post<Result<Portfolio>>(this.baseUrl + 'ProfileProject', data);
  }

  deleteProfilePortfolio(id: number): Observable<Result<number>> {
    return this._http.delete<Result<number>>(this.baseUrl + `ProfileProject/${id}`);
  }
}
