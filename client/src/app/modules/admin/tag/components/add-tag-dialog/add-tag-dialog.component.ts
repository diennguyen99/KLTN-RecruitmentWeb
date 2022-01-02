import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import slugify from "slugify";
import { Tag} from "../../../../../core/models/tag.model";
import { ToastrService } from "ngx-toastr";
import { TagService } from "../../services";

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html'
})
export class AddTagDialogComponent implements OnInit {

  form!: FormGroup;
  titleForm: string = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tag,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _tagService: TagService
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
      const dataForm = {
        ...this.form.value,
        slug: slugify(this.form.get('name')?.value)
      }

      this._tagService.addEditTag(dataForm).subscribe(result => {
        if(result.succeeded){
          this._toastrService.success('Saved success!');
        }else {
          this._toastrService.error('Saved fail!');
        }
      })
    }
  }
}
