import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Sort } from "@angular/material/sort";
import { TagService } from "./services";
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { Tag } from "../../../core/models/tag.model";
import { TableColumn } from "../../../shared/components/table/table-column";
import { TagParams } from "./params/tag.params";
import { PaginatedFilter } from "../../../core/models/filter/paginated-filter";
import { AddTagDialogComponent } from "./components/add-tag-dialog/add-tag-dialog.component";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit {

  tags!: PaginatedResult<Tag>;
  tagColumns: TableColumn[] = [];
  tagParams = new TagParams();
  searchString: string = '';

  constructor(
    private readonly _tagService: TagService,
    private readonly _dialog: MatDialog,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getTags();
    this.initialColumns();
  }

  getTags() {
    this._tagService.getTags(this.tagParams).subscribe(result => {
      this.tags = result;
    })
  }

  initialColumns(): void {
    this.tagColumns = [
      { name: 'Name', dataKey: 'name', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'date' },
      { name: 'Action', dataKey: 'action', position: 'right', style: 'none' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.tagParams.pageNumber = event.pageNumber;
    this.tagParams.pageSize = event.pageSize;
    this.getTags();
  }

  openForm(tag?: Tag): void {
    const dialogRef = this._dialog.open(AddTagDialogComponent, {
      data: tag,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTags();
      }
    });
  }

  remove($event: string): void {
    const idRemove = parseInt($event, 10);

    this._tagService.deleteTag(idRemove).subscribe(result => {
      if(result.succeeded) {
        this.getTags();
        this._toastrService.success('Delete Success');
      } else {
        this._toastrService.error(result.messages.toString());
      }
    });
  }

  sort($event: Sort): void {
    this.tagParams.orderBy = $event.active + ' ' + $event.direction;
    this.getTags();
  }

  filter($event: string): void {
    this.tagParams.searchString = $event.trim().toLocaleLowerCase();
    this.tagParams.pageNumber = 0;
    this.tagParams.pageSize = 0;
    this.getTags();
  }

  reload(): void {
    this.tagParams.searchString = '';
    this.tagParams.pageNumber = 0;
    this.tagParams.pageSize = 0;
    this.getTags();
  }
}
