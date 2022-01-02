import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { CityService } from "../../services";
import { City } from "../../../../../core/models/city.model";
import slugify from "slugify";

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html'
})
export class AddCityDialogComponent implements OnInit {

  form!: FormGroup;
  titleForm: string = 'Add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: City,
    private readonly _fb: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _cityService: CityService
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

      this._cityService.addEditCity(dataForm).subscribe(result => {
        if(result.succeeded){
          this._toastrService.success('Saved success!');
        }else {
          this._toastrService.error('Saved fail!');
        }
      })
    }
  }
}
