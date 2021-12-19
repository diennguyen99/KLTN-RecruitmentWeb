import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { JobTag } from "../../../core/models/job-tag.model";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../store";
import {map, Observable, startWith, Subscription} from "rxjs";
import { JobType } from "../../../core/models/job-type.model";
import { JobExperience } from "../../../core/models/job-experience.model";
import { City } from "../../../core/models/city.model";
import { Tag} from "../../../core/models/tag.model";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {

  private baseUrl = environment.apiURL;

  form!: FormGroup;

  jobTypes$!: Observable<JobType[]>;
  jobExperiences$!: Observable<JobExperience[]>;
  jobTypeSelected: number = 0;
  jobExperienceSelected: number = 0;

  cities: City[] = [];
  tags: Tag[] = [];
  citiesSubscription!: Subscription;
  tagsAppSubscription!: Subscription;
  filteredCities!: Observable<City[]>;
  filteredTags!: Observable<City[]>;

  sortSelected: string = 'createdOn desc';
  sortOptions: { name: string, value: string }[] = [
    { name: 'Newest', value: 'createdOn desc'},
    { name: 'Oldest', value: 'createdOn'},
  ]

  // paging
  currentPage: number = 1;
  pageSize: number = 1;
  totalCount: number = 0;
  totalPages: number = 0;

  jobTags: JobTag[] = [];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _http: HttpClient,
    private readonly _storeApp: Store<fromStore.AppState>,
    private readonly _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialForm();

    this._route.queryParams.subscribe(params => {
      const tag = params['tag'] ?? null;
      const city = params['city'] ?? null;

      this.getJobs(tag, city, this.jobTypeSelected, this.jobExperienceSelected);
    })

    this.jobTypes$ = this._storeApp.select(fromStore.getAllJobTypes);
    this.jobExperiences$ = this._storeApp.select(fromStore.getAllJobExperiences);

    this.citiesSubscription = this._storeApp.select(fromStore.getAllCities).subscribe((response) => {
      this.cities = response;
    });
    this.citiesSubscription = this._storeApp.select(fromStore.getAllTags).subscribe((response) => {
      this.tags = response;
    });

    this.filteredTags = this.form.get('tag')!.valueChanges.pipe(
      startWith(''),
      map(tag => (tag ? this.filterTags(tag) : this.tags.slice())),
    );

    this.filteredCities = this.form.get('city')!.valueChanges.pipe(
      startWith(''),
      map(city => (city ? this.filterCities(city) : this.cities.slice())),
    );
  }

  private initialForm() {
    this.form = this._fb.group({
      tag: [null],
      city: [null]
    })
  }

  private filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.name?.toLowerCase().includes(filterValue));
  }

  private filterTags(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(tag => tag.name?.toLowerCase().includes(filterValue));
  }

  onJobTypeSelected(jobTypeId: number) {
    if (this.jobTypeSelected === jobTypeId) {
      this.jobTypeSelected = 0
    } else {
      this.jobTypeSelected = jobTypeId;
    }
  }

  onJobExperienceSelected(jobExperienceId: number) {
    if (this.jobExperienceSelected === jobExperienceId) {
      this.jobExperienceSelected = 0;
    } else {
      this.jobExperienceSelected = jobExperienceId;
    }
  }

  onSortSelected(event: any){
    this.sortSelected = event.target.value ?? 'createdOn desc';
    this.onSearch();
  }

  onPaginateChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.onSearch();
  }

  private getJobs(tag: string, city: string, jobTypeId: number, jobExperienceId: number){
    let paramsQuery = new HttpParams();
    if (tag) paramsQuery = paramsQuery.append('tag', tag);
    if (city) paramsQuery = paramsQuery.append('city', city);
    paramsQuery = paramsQuery.append('jobTypeId', jobTypeId);
    paramsQuery = paramsQuery.append('jobExperienceId', jobExperienceId);
    paramsQuery = paramsQuery.append('pageNumber', this.currentPage);
    paramsQuery = paramsQuery.append('pageSize', this.pageSize);
    paramsQuery = paramsQuery.append('orderBy', this.sortSelected);

    this._http.get<PaginatedResult<JobTag>>(this.baseUrl + 'JobTag', { params: paramsQuery }).subscribe((response) => {
      this.jobTags = response.data;
      this.currentPage = response.currentPage;
      this.totalCount = response.totalCount;
      this.totalPages = response.totalPages;
    });
  }

  onSearch() {
    const tag = this.tags.find(t => t.name === this.form.get('tag')?.value)?.slug;
    const city = this.cities.find(c => c.name === this.form.get('city')?.value)?.slug;
    this.getJobs(tag!, city!, this.jobTypeSelected, this.jobExperienceSelected);
  }
}
