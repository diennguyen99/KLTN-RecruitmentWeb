import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import * as fromStore from '../../store';
import { Experience } from "../../models/experience.model";

@Component({
  selector: 'app-add-edit-experience-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-edit-experience-dialog.component.html'
})
export class AddEditExperienceDialogComponent implements OnInit {

  titleDialog: string = 'Add'
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Experience,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _store: Store<fromStore.AccountState>
  ) {}

  ngOnInit(): void {
    this.initialForm();
    if (this._data.id) {
      this.titleDialog = 'Edit';
      this.form.patchValue(this._data);
    }
  }

  private initialForm(): void {
    this.form = this._fb.group({
      id: [0],
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      isPresent: [false],
      dateStart: [new Date(), Validators.required],
      dateEnd: [new Date()],
      description: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if (this.form.valid){
      this._store.dispatch(fromStore.addEditExperience({ data: this.form.value }))
      this.dialogRef.close();
    }
  }

  onDelete(): void {
    if (this._data.id){
      this._store.dispatch(fromStore.deleteExperience({ id: this._data.id }))
      this.dialogRef.close();
    }
  }
}
