import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PaginatedResult} from "../../../core/models/wrappers/PaginatedResult";
import {Company} from "../../../core/models/company.model";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {

  private baseUrl = environment.apiURL;
  form!: FormGroup;

  // paging
  currentPage: number = 1;
  pageSize: number = 8;
  totalCount: number = 0;
  totalPages: number = 0;

  companies: Company[] = [];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initialForm();

    this.getCompanies('');
  }

  onSearch() {
    this.getCompanies(this.form.get('searchString')?.value || '');
  }

  onPaginateChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.onSearch();
  }

  private initialForm(){
    this.form = this._fb.group({
      searchString: ['']
    })
  }

  private getCompanies(searchString: string){
    let paramsQuery = new HttpParams();
    if (searchString) paramsQuery = paramsQuery.append('searchString', searchString);
    paramsQuery = paramsQuery.append('pageNumber', this.currentPage);
    paramsQuery = paramsQuery.append('pageSize', this.pageSize);
    paramsQuery = paramsQuery.append('orderBy', 'createdOn desc');

    this._http.get<PaginatedResult<Company>>(this.baseUrl + 'Company', { params: paramsQuery }).subscribe((response) => {
      this.companies = response.data;
      this.currentPage = response.currentPage;
      this.totalCount = response.totalCount;
      this.totalPages = response.totalPages;
    });
  }
}
