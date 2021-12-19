import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Result } from "../models/wrappers/Result";
import { City } from "../models/city.model";
import { CityParams } from "../params/city.params";

@Injectable()
export class CitiesService {
  private baseUrl = environment.apiURL;

  constructor(private readonly _http: HttpClient) {}

  getCities(cityParams: CityParams): Observable<Result<City[]>> {
    let params = new HttpParams();
    if (cityParams.searchString)
      params = params.append('searchString', cityParams.searchString);
    if (cityParams.pageNumber)
      params = params.append('pageNumber', cityParams.pageNumber.toString());
    if (cityParams.pageSize)
      params = params.append('pageSize', cityParams.pageSize.toString());
    if (cityParams.orderBy)
      params = params.append('orderBy', cityParams.orderBy.toString());

    return this._http.get<Result<City[]>>(this.baseUrl + 'city', { params: params });
  }
}
