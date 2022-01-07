import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../store";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  fullName!: string;

  constructor(
    private readonly _authService: AuthService,
    private readonly _storeApp: Store<fromStore.AppState>,
  ) {}

  ngOnInit(): void {
    this.fullName = this._authService.getFullName;
  }

  logout(): void {
    this._authService.logout();
  }
}
