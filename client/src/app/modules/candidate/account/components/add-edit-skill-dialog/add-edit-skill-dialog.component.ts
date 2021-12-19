import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable, startWith, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { SkillNameParams } from "../../params/skill-name.params";
import { SkillName } from "../../models/skill-name.model";
import { Skill } from "../../models/skill.model";

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-add-edit-skill-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-edit-skill-dialog.component.html'
})
export class AddEditSkillDialogComponent implements OnInit, OnDestroy {

  titleDialog: string = 'Add'
  form!: FormGroup;
  storeSubscription!: Subscription;
  skillsName: SkillName[] = [];
  skillsNameOptions$!: Observable<SkillName[]>;

  constructor(
    public dialogRef: MatDialogRef<AddEditSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Skill,
    private readonly _fb: FormBuilder,
    private readonly _store: Store<fromStore.AccountState>
  ) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.loadSkillsName({ params: new SkillNameParams() }));
    this.storeSubscription = this._store.select(fromStore.getAllSkillsName)
      .subscribe((response) => this.skillsName = response);

    this.initialForm();
    if (this._data?.id) {
      this.titleDialog = 'Edit';
      this.form.patchValue({
        name: this._data.skill?.name,
        scores: this._data.scores
      })
    }

    this.skillsNameOptions$ = this.form.get('name')!.valueChanges.pipe(
      startWith(''),
      map(skillName => (skillName ? this.filterSkillsName(skillName) : this.skillsName.slice())),
    );
  }

  private initialForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      scores: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    })
  }

  private filterSkillsName(value: string): SkillName[] {
    const filterValue = value.toLowerCase();
    return this.skillsName.filter(skillName => skillName.name.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    const skillName = this.skillsName.find(s => s.name == this.form.get('name')?.value);
    if (this.form.valid && skillName != undefined) {
      const data = {
        id: this._data.id ?? 0,
        skillId: skillName?.id,
        scores: this.form.get('scores')!.value,
        name: skillName.name
      }
      this._store.dispatch(fromStore.addEditSkill({ data }));
      this.dialogRef.close();
    }
  }

  onDelete(): void {
    if (this._data.id){
      this._store.dispatch(fromStore.deleteSkill({ id: this._data.id }))
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
