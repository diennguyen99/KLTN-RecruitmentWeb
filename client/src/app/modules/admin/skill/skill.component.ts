import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { SkillService } from "./services";
import { PaginatedResult } from "../../../core/models/wrappers/PaginatedResult";
import { TableColumn } from "../../../shared/components/table/table-column";
import { SkillParams } from "./params/skill.params";
import { PaginatedFilter } from "../../../core/models/filter/paginated-filter";
import { AddSkillDialogComponent } from "./components/add-skill-dialog/add-skill-dialog.component";
import { Sort } from "@angular/material/sort";
import { Skill } from "./models/skill.model";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html'
})
export class SkillComponent implements OnInit {

  skills!: PaginatedResult<Skill>;
  skillColumns: TableColumn[] = [];
  skillParams = new SkillParams();
  searchString: string = '';

  constructor(
    private readonly _skillService: SkillService,
    private readonly _dialog: MatDialog,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSkills();
    this.initialColumns();
  }

  getSkills() {
    this._skillService.getSkills(this.skillParams).subscribe(result => {
      this.skills = result;
    })
  }

  initialColumns(): void {
    this.skillColumns = [
      { name: 'Name', dataKey: 'name', isSortTable: true, isShowTable: true, style: 'none' },
      { name: 'Created On', dataKey: 'createdOn', isSortTable: true, isShowTable: true, style: 'date' },
      { name: 'Action', dataKey: 'action', position: 'right', style: 'none' },
    ]
  }

  pageChanged(event: PaginatedFilter): void {
    this.skillParams.pageNumber = event.pageNumber;
    this.skillParams.pageSize = event.pageSize;
    this.getSkills();
  }

  openForm(skill?: Skill): void {
    const dialogRef = this._dialog.open(AddSkillDialogComponent, {
      data: skill,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSkills();
      }
    });
  }

  remove($event: string): void {
    const idRemove = parseInt($event, 10);

    this._skillService.deleteSkill(idRemove).subscribe(result => {
      if(result.succeeded) {
        this.getSkills();
        this._toastrService.success('Delete Success');
      } else {
        this._toastrService.error(result.messages.toString());
      }
    });
  }

  sort($event: Sort): void {
    this.skillParams.orderBy = $event.active + ' ' + $event.direction;
    this.getSkills();
  }

  filter($event: string): void {
    this.skillParams.searchString = $event.trim().toLocaleLowerCase();
    this.skillParams.pageNumber = 0;
    this.skillParams.pageSize = 0;
    this.getSkills();
  }

  reload(): void {
    this.skillParams.searchString = '';
    this.skillParams.pageNumber = 0;
    this.skillParams.pageSize = 0;
    this.getSkills();
  }
}
