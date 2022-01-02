import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Sort } from "@angular/material/sort";
import { UserService } from "./services";
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { User } from "./models/user.model";
import { TableColumn } from "../../../shared/components/table/table-column";
import { UserParams } from "./params/user.params";
import { PaginatedFilter } from "../../../core/models/filter/paginated-filter";
import { LockUserDialogComponent } from "./components/lock-user-dialog/lock-user-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  users!: PaginatedResult<User>;
  userColumns: TableColumn[] = [];
  userParams = new UserParams();
  searchString: string = '';

  constructor(
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.initialColumns();
  }

  getUsers() {
    this._userService.getUsers(this.userParams).subscribe(result => {
      this.users = result;
    })
  }

  initialColumns(): void {
    this.userColumns = [
      { name: 'First Name', dataKey: 'firstName', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Last Name', dataKey: 'lastName', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'User Name', dataKey: 'userName', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Email', dataKey: 'email', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Phone', dataKey: 'phoneNumber', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Active', dataKey: 'isActive', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Action', dataKey: 'action', position: 'right', style: 'none' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.userParams.pageNumber = event.pageNumber;
    this.userParams.pageSize = event.pageSize;
    this.getUsers();
  }

  openForm(user?: User): void {
    const dialogRef = this._dialog.open(LockUserDialogComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  sort($event: Sort): void {
    this.userParams.orderBy = $event.active + ' ' + $event.direction;
    this.getUsers();
  }

  filter($event: string): void {
    this.userParams.searchString = $event.trim().toLocaleLowerCase();
    this.userParams.pageNumber = 0;
    this.userParams.pageSize = 0;
    this.getUsers();
  }

  reload(): void {
    this.userParams.searchString = '';
    this.userParams.pageNumber = 0;
    this.userParams.pageSize = 0;
    this.getUsers();
  }
}
