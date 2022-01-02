import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { Company } from "../../../core/models/company.model";
import { CompaniesService } from "./services";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {

  form!: FormGroup;

  // paging
  currentPage: number = 1;
  pageSize: number = 8;
  totalCount: number = 0;
  totalPages: number = 0;

  companies: Company[] = [];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _companiesService: CompaniesService
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

    this._companiesService.findCompanies(paramsQuery).subscribe((response) => {
      this.companies = response.data;
      this.currentPage = response.currentPage;
      this.totalCount = response.totalCount;
      this.totalPages = response.totalPages;
    })
  }
}
