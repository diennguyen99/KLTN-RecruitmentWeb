import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { Education } from "../../models/education.model";

@Component({
  selector: 'app-add-edit-education-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-edit-education-dialog.component.html'
})
export class AddEditEducationDialogComponent implements OnInit {

  titleDialog: string = 'Add'
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditEducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Education,
    private readonly _fb: FormBuilder,
    private readonly _store: Store<fromStore.AccountState>
  ) { }

  ngOnInit(): void {
    this.initialForm();
    if (this._data?.id) {
      this.titleDialog = 'Edit';
      this.form.patchValue(this._data);
    }
  }

  private initialForm(): void {
    this.form = this._fb.group({
      id: [0],
      schoolName: ['', Validators.required],
      majorsName: ['', Validators.required],
      isPresent: [false],
      dateStart: [new Date(), Validators.required],
      dateEnd: [new Date()],
    })
  }

  onSubmit(): void {
    if (this.form.valid){
      this._store.dispatch(fromStore.addEditEducation({ data: this.form.value }))
      this.dialogRef.close();
    }
  }

  onDelete(): void {
    if (this._data.id){
      this._store.dispatch(fromStore.deleteEducation({ id: this._data.id }))
      this.dialogRef.close();
    }
  }
}
