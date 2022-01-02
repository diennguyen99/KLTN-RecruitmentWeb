import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CityParams } from "../params/city.params";
import { Observable } from "rxjs";
import { PaginatedResult } from "../../../../core/models/wrappers/PaginatedResult";
import { Result } from "../../../../core/models/wrappers/Result";
import { City } from "../../../../core/models/city.model";

@Injectable()
export class CityService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getCities(cityParams: CityParams): Observable<PaginatedResult<City>> {
    let params = new HttpParams();
    if (cityParams.searchString) {
      params = params.append('searchString', cityParams.searchString);
    }
    if (cityParams.pageNumber) {
      params = params.append('pageNumber', cityParams.pageNumber.toString());
    }
    if (cityParams.pageSize) {
      params = params.append('pageSize', cityParams.pageSize.toString());
    }
    if (cityParams.orderBy) {
      params = params.append('orderBy', cityParams.orderBy.toString());
    }

    return this._http.get<PaginatedResult<City>>(this.baseUrl + 'City', { params })
  }

  deleteCity(id: number): Observable<Result<any>> {
    return this._http.delete<Result<any>>(this.baseUrl + `City/${id}`);
  }

  addEditCity(data: any): Observable<Result<any>> {
    return this._http.post<Result<any>>(this.baseUrl + 'City', data);
  }
}
