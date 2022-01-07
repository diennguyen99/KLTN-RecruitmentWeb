import { Component, OnInit } from '@angular/core';
import { Job } from "../../../../core/models/job.model";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html'
})
export class FavouriteComponent implements OnInit {

  pageSize: number = 5;
  currentPage: number = 1;
  totalCount: number = 0;
  totalPage: number = 0;

  favouriteJobs: Job[] = [];

  onPaginateChange(event: any) {
    this.currentPage = event.pageIndex + 1;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getJobs() {

  }
}
