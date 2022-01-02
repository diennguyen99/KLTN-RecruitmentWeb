import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Skill } from "../../models/skill.model";
import { ToastrService } from "ngx-toastr";
import { SkillService } from "../../services";

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html'
})
export class AddSkillDialogComponent implements OnInit {

  form!: FormGroup;
  titleForm: string = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _skillService: SkillService
  ) { }

  ngOnInit(): void {
    this.initialForm();
    if (this.data && this.data.id) {
      this.titleForm = 'Edit';
      this.form.patchValue(this.data);
    }
  }

  initialForm() {
    this.form = this._fb.group({
      id: [0],
      name: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.form.valid){
      this._skillService.addEditSkill(this.form.value).subscribe(result => {
        if(result.succeeded){
          this._toastrService.success('Saved success!');
        }else {
          this._toastrService.error('Saved fail!');
        }
      })
    }
  }
}
