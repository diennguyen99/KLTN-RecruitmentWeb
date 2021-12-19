import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { Summary } from "../../models/summary.model";

@Component({
  selector: 'app-add-edit-summary-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-edit-summary-dialog.component.html'
})
export class AddEditSummaryDialogComponent implements OnInit {

  titleDialog: string = 'Add'
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Summary,
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
      summary: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.form.valid){
      this._store.dispatch(fromStore.addEditSummary({ data: this.form.value }))
      this.dialogRef.close();
    }
  }
}
