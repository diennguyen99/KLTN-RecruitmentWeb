import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._authService.logout();
  }
}
