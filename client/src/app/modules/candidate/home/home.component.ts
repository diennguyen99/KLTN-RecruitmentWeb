import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, startWith, map, Subscription } from "rxjs";
import { FormBuilder , FormGroup } from "@angular/forms";
import * as fromStore from "../../../store";
import { Store } from "@ngrx/store";
import { City } from "../../../core/models/city.model";
import { Tag } from "../../../core/models/tag.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  cities: City[] = [];
  tags: Tag[] = [];
  citiesSubscription!: Subscription;
  tagsAppSubscription!: Subscription;
  filteredCities!: Observable<City[]>;
  filteredTags!: Observable<City[]>;

  constructor(
    private readonly _storeApp: Store<fromStore.AppState>,
    private readonly _fb: FormBuilder,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.initialForm();
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

  private filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.name?.toLowerCase().includes(filterValue));
  }

  private filterTags(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(tag => tag.name?.toLowerCase().includes(filterValue));
  }

  private initialForm() {
    this.form = this._fb.group({
      tag: [null],
      city: [null]
    })
  }

  onSearch(): void {
    const tagQuery = this.tags.find(c => c.name == this.form.get('tag')?.value)?.slug;
    const cityQuery = this.cities.find(c => c.name == this.form.get('city')?.value)?.slug;
    if (tagQuery && cityQuery) {
      this._router.navigate(['/candidate/jobs'], { queryParams: { tag: tagQuery, city: cityQuery }})
    }
    else if (tagQuery) {
      this._router.navigate(['/candidate/jobs'], { queryParams: { tag: tagQuery }})
    }
    else if (cityQuery) {
      this._router.navigate(['/candidate/jobs'], { queryParams: { city: cityQuery }})
    }
    else {
      this._router.navigate(['/candidate/jobs'])
    }
  }

  ngOnDestroy(): void {
    this.citiesSubscription.unsubscribe();
    this.citiesSubscription.unsubscribe();
  }
}
