import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { Portfolio } from "../../models/portfolio.model";

@Component({
  selector: 'app-add-edit-portfolio-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-edit-portfolio-dialog.component.html'
})
export class AddEditPortfolioDialogComponent implements OnInit {

  titleDialog: string = 'Add'
  form!: FormGroup;
  image!: File;

  constructor(
    public dialogRef: MatDialogRef<AddEditPortfolioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Portfolio,
    private readonly _fb: FormBuilder,
    private readonly _store: Store<fromStore.AccountState>
  ) { }

  ngOnInit(): void {
    this.initialForm();
    if (this._data.id) {
      this.titleDialog = 'Edit';
      this.form.patchValue(this._data);
    }
  }

  private initialForm(): void {
    this.form = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: [null],
      url: ['', Validators.required],
      dateStart: [new Date(), Validators.required],
      dateEnd: [new Date(), Validators.required],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this._data?.id ?? 0;
      const formData = new FormData();
      if (this.image){
        formData.append('thumbnail', this.image, this.image.name);
      }
      formData.append('id', id.toString());
      formData.append('title', this.form.get('title')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('url', this.form.get('url')?.value);
      formData.append('dateStart', new Date(this.form.get('dateStart')?.value).toISOString());
      formData.append('dateEnd', new Date(this.form.get('dateEnd')?.value).toISOString());
      this._store.dispatch(fromStore.addEditPortfolio({ data: formData }));
      this.dialogRef.close();
    }
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.image = fileToUpload;
  }

  onDelete(): void {
    if (this._data.id){
      this._store.dispatch(fromStore.deletePortfolio({ id: this._data.id }))
      this.dialogRef.close();
    }
  }
}
