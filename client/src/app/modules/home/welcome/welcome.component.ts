import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../store";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor(
    private readonly _authService: AuthService,
    private readonly _storeApp: Store<fromStore.AppState>,
  ) {}

  ngOnInit(): void {
  }

  logout(): void {
    this._authService.logout();
  }
}
