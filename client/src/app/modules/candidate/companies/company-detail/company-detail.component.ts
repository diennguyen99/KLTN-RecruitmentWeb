import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Result} from "../../../../core/models/wrappers/Result";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {Company} from "../../../../core/models/company.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  private baseUrl = environment.apiURL;
  company$!: Observable<Result<Company>>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.company$ = this._http.get<Result<Company>>(this.baseUrl + `Company/${params.get('slug')}`);
    })
  }

}
