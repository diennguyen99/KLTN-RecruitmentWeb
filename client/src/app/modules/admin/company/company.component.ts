import { Component, OnInit } from '@angular/core';
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { TableColumn } from "../../../shared/components/table/table-column";
import { Company } from "../../../core/models/company.model";
import { CompanyParams } from "./params/company.params";
import { CompanyService } from "./services";
import { PaginatedFilter } from "../../../core/models/filter/paginated-filter";
import { Sort } from "@angular/material/sort";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  companies!: PaginatedResult<Company>;
  companyColumns: TableColumn[] = [];
  companyParams = new CompanyParams();
  searchString: string = '';

  constructor(
    private readonly _companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCompanies();
    this.initialColumns();
  }

  getCompanies() {
    this._companyService.getCompanies(this.companyParams).subscribe(result => {
      this.companies = result;
    })
  }

  initialColumns(): void {
    this.companyColumns = [
      { name: 'Logo', dataKey: 'logo', isSortTable: false, isShowTable: true, style: 'image' },
      { name: 'Name Company', dataKey: 'name', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Phone Contact', dataKey: 'phone', isSortTable: false, isShowTable: true, style: 'none' },
      { name: 'Address', dataKey: 'address', isSortTable: false, isShowTable: true, style: 'none' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'date' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.companyParams.pageNumber = event.pageNumber;
    this.companyParams.pageSize = event.pageSize;
    this.getCompanies();
  }

  sort($event: Sort): void {
    this.companyParams.orderBy = $event.active + ' ' + $event.direction;
    this.getCompanies();
  }

  filter($event: string): void {
    this.companyParams.searchString = $event.trim().toLocaleLowerCase();
    this.companyParams.pageNumber = 0;
    this.companyParams.pageSize = 0;
    this.getCompanies();
  }

  reload(): void {
    this.companyParams.searchString = '';
    this.companyParams.pageNumber = 0;
    this.companyParams.pageSize = 0;
    this.getCompanies();
  }
}
