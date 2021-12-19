import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Layout } from './layout.types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  layout: Layout = 'auth';

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.layout = this.activatedRoute.snapshot.data['layout'] as Layout;
  }

  ngOnInit(): void {}
}
