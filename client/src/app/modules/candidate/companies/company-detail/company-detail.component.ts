import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { CompaniesService } from "../services";
import { Result } from "../../../../core/models/wrappers/Result";
import { Company } from "../../../../core/models/company.model";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  company$!: Observable<Result<Company>>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _companiesService: CompaniesService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.company$ = this._companiesService.findCompanyBySlug(params.get('slug'))
    })
  }
}
