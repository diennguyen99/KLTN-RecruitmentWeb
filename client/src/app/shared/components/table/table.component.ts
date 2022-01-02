import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { environment } from "../../../../environments/environment";
import { TableColumn } from './table-column';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ViewCvDialogComponent } from "../view-cv-dialog/view-cv-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { PaginatedFilter } from 'src/app/core/models/filter/paginated-filter';
import { PageEvent } from '@angular/material/paginator';
import { CustomAction } from './custom-action';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  baseUrl = environment.assetURl;
  dateNow = new Date().toISOString();

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns!: string[];
  @Input() customActionOneData!: CustomAction;
  @Input() customActionData!: CustomAction;
  searchString!: string;
  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Output() onPageChanged = new EventEmitter<PaginatedFilter>();

  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @Input() title!: string;
  @Input() subtitle!: string;

  @Input() isSortable = false;
  @Input() columns!: TableColumn[];

  @Input() set data(data: any[]) {
    this.setTableDataSource(data);
  }

  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onReload: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSort: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() onCustomActionOne: EventEmitter<any> = new EventEmitter();
  @Output() onCustomAction: EventEmitter<any> = new EventEmitter();
  @Output() onCreateForm: EventEmitter<any> = new EventEmitter();
  @Output() onEditForm: EventEmitter<any> = new EventEmitter();
  @Output() onView: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Input() isEdit: boolean = false;
  @Input() linkEdit: string = '';

  constructor(public dialog: MatDialog) { }
  gold!: EventEmitter<{ data: CustomAction }>[];
  ngOnInit(): void {
    const columnNames = this.columns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    this.displayedColumns = columnNames;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.matSort;
  }

  setTableDataSource(data: any) {
    // @ts-ignore
    this.tableDataSource = new MatTableDataSource<any>(data);
  }

  openCustomActionOne($event: any) {
    this.onCustomActionOne.emit($event);
  }

  handleCustomAction() {
    this.onCustomAction.emit(this.tableDataSource.data);
  }

  openCreateForm() {
    this.onCreateForm.emit();
  }

  openEditForm($event?: any) {
    this.onEditForm.emit($event);
  }
  openViewForm($event?: any) {
    this.onView.emit($event);
  }

  handleReload() {
    this.searchString = '';
    this.onReload.emit();
  }

  handleFilter() {
    this.onFilter.emit(this.searchString);
  }

  handleSort(sortParams: Sort) {
    // @ts-ignore
    sortParams.active = this.columns.find(
      (column) => column.name === sortParams.active
    ).dataKey;
    if (sortParams.direction == "")
    {
      sortParams.direction = "asc";
    }
    this.onSort.emit(sortParams);
  }

  openDeleteConfirmationDialog($event: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `Are you sure you want to delete?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete.emit($event);
      }
    });
  }

  onPageChange(pageEvent: PageEvent) {
    const event: PaginatedFilter = {
      pageNumber: pageEvent.pageIndex + 1 ?? 1,
      pageSize: pageEvent.pageSize ?? 10,
    };
    this.onPageChanged.emit(event);
  }

  isAllSelected() {
    let result = true;
    this.tableDataSource.data.forEach(element => {
      // @ts-ignore
      if (element.selected === false) result = false;
    });
    return result;
  }

  toggleTableDataSourceChecking(condition: boolean) {
    this.tableDataSource.data.forEach(element => {
      // @ts-ignore
      element.selected = condition;
    });
  }

  masterToggle() {
    this.isAllSelected() ? this.toggleTableDataSourceChecking(false) : this.toggleTableDataSourceChecking(true);
  }

  openCVDialog(id: number) {
    this.dialog.open(ViewCvDialogComponent, {
      width: '60%',
      height: '100%',
      data: id,
    });
  }
}
