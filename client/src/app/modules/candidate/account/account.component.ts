import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from "./store";
import { Profile } from "./models/profile.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  profileInfo$!: Observable<Profile>;

  constructor(
    private readonly _store: Store<fromStore.AccountState>,
  ) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.loadProfile());
    this.profileInfo$ = this._store.select(fromStore.getProfile);
  }
}
