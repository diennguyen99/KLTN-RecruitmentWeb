import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  @Input() inputSideNav!: MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }

  onLogout() {
    console.log('logout');
  }
}
