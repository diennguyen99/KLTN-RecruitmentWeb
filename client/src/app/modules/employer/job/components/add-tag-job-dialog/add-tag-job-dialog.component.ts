import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { map, Observable, startWith } from "rxjs";
import { Tag } from "../../../../../core/models/tag.model";
import { TagJobService } from "../../services";

@Component({
  selector: 'app-add-tag-job-dialog',
  templateUrl: './add-tag-job-dialog.component.html'
})
export class AddTagJobDialogComponent implements OnInit {

  title: string = 'Add';
  form!: FormGroup;
  tags: Tag[] = [];
  filteredTags!: Observable<Tag[]>;

  constructor(
    public dialogRef: MatDialogRef<AddTagJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _fb: FormBuilder,
    private readonly _tabJobService: TagJobService,
    private readonly _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initialForm();
    if (this.data?.id != 0) {
      this.title = 'Edit';
      this.form.patchValue({ tag: this.data?.tag });
    }
    this.getTags();
    this.filteredTags = this.form.get('tag')!.valueChanges.pipe(
      startWith(''),
      map(tag => (tag ? this.filterTags(tag) : this.tags.slice())),
    );
  }

  getTags() {
    this._tabJobService.getTags().subscribe(result => {
      this.tags = result.data;
    })
  }

  private initialForm(){
    this.form = this._fb.group({
      'tag': ['', Validators.required]
    })
  }

  private filterTags(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(tag => tag.name?.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    const tagId = this.tags.find(t => t.name == this.form.get('tag')?.value)?.id;
    if (tagId && this.data?.jobId != 0) {
      const data = {
        id: this.data?.id ?? 0,
        jobId: this.data?.jobId,
        tagId
      }
      this._tabJobService.addEditTagJob(data).subscribe(result => {
        if(result.succeeded) {
          this._toastrService.success(`${this.title} Success!`);
          this.dialogRef.close(true);
        }else {
          this._toastrService.error(`${this.title} Fail!`)
        }
      })
    }
  }

  onDelete() {
    if (this.data?.id) {
      this._tabJobService.deleteTagJob(this.data?.id).subscribe(result => {
        if(result.succeeded) {
          this._toastrService.success('Delete Success!');
          this.dialogRef.close(true);
        }else{
          this._toastrService.error('Delete Fail');
        }
      })
    }
  }
}
