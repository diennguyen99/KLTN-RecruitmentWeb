import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Sort } from "@angular/material/sort";
import { CityService } from "./services";
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { TableColumn } from "../../../shared/components/table/table-column";
import { CityParams } from "./params/city.params";
import { City } from "../../../core/models/city.model";
import { PaginatedFilter } from "../../../core/models/filter/paginated-filter";
import { AddCityDialogComponent } from "./components/add-city-dialog/add-city-dialog.component";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {

  cities!: PaginatedResult<City>;
  cityColumns: TableColumn[] = [];
  cityParams = new CityParams();
  searchString: string = '';

  constructor(
    private readonly _cityService: CityService,
    private readonly _dialog: MatDialog,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.initialColumns();
  }

  getCities() {
    this._cityService.getCities(this.cityParams).subscribe(result => {
      this.cities = result;
    })
  }

  initialColumns(): void {
    this.cityColumns = [
      { name: 'Name', dataKey: 'name', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'date' },
      { name: 'Action', dataKey: 'action', position: 'right', style: 'none' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.cityParams.pageNumber = event.pageNumber;
    this.cityParams.pageSize = event.pageSize;
    this.getCities();
  }

  openForm(city?: City): void {
    const dialogRef = this._dialog.open(AddCityDialogComponent, {
      data: city,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCities();
      }
    });
  }

  remove($event: string): void {
    const idRemove = parseInt($event, 10);

    this._cityService.deleteCity(idRemove).subscribe(result => {
      if(result.succeeded) {
        this.getCities();
        this._toastrService.success('Delete Success');
      } else {
        this._toastrService.error(result.messages.toString());
      }
    });
  }

  sort($event: Sort): void {
    this.cityParams.orderBy = $event.active + ' ' + $event.direction;
    this.getCities();
  }

  filter($event: string): void {
    this.cityParams.searchString = $event.trim().toLocaleLowerCase();
    this.cityParams.pageNumber = 0;
    this.cityParams.pageSize = 0;
    this.getCities();
  }

  reload(): void {
    this.cityParams.searchString = '';
    this.cityParams.pageNumber = 0;
    this.cityParams.pageSize = 0;
    this.getCities();
  }
}
