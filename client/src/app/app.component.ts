import { Component, OnInit } from '@angular/core';
import { AuthService } from "./core/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from './store';
import { CityParams } from "./core/params/city.params";
import { TagParams } from "./core/params/tag.params";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private readonly _store: Store<fromStore.AppState>,
    private readonly _authService: AuthService,
    private readonly _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.isLoading$ = this._store.select(fromStore.getSpinner);
    this._store.dispatch(fromStore.loadCitiesName({ params: new CityParams() }));
    this._store.dispatch(fromStore.loadTags({ params: new TagParams() }));
    this._store.dispatch(fromStore.loadJobTypes());
    this._store.dispatch(fromStore.loadJobExperiences());
  }

  loadCurrentUser() {
    this._authService.loadCurrentUser().subscribe({
      next: () => {},
      error: err => console.log(err)
    })
  }
}
