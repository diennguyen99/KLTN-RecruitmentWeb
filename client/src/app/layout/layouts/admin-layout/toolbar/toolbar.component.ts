import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { AuthService } from "../../../../core/services";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  @Input() inputSideNav!: MatSidenav;

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this._authService.logout();
  }
}
