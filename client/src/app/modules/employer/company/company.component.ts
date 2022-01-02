import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyService } from "./services";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  image!: File;
  imageUrl: any = '';
  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _companyService: CompanyService,
    private readonly _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialForm();
    this._companyService.getCompany().subscribe(result => {
      this.form.patchValue(result.data);
      if (this.form.get('logo')?.value) {
        this.imageUrl = this.form.get('logo')?.value;
      }
    })
  }

  private initialForm() {
    this.form = this._fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      logo: ['', Validators.required],
      description: ['', Validators.required],
      website: ['', Validators.required],
      establishedIn: ['', Validators.required],
      numberOfEmployees: ['', Validators.required],
      fax: ['', Validators.required],
      facebook: [''],
      twitter: [''],
      linkedin: ['']
    })
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File>files[0];

    const reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = (event) => {
      this.imageUrl = event.target?.result;
    }

    this.image = fileToUpload;
  }

  onSubmit() {
    const formData = new FormData();
    if (this.image){
      formData.append('logo', this.image, this.image.name);
    }
    formData.append('id', this.form.get('id')?.value ?? 0);
    formData.append('name', this.form.get('name')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('address', this.form.get('address')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('website', this.form.get('website')?.value);
    formData.append('establishedIn', this.form.get('establishedIn')?.value);
    formData.append('numberOfEmployees', this.form.get('numberOfEmployees')?.value);
    formData.append('fax', this.form.get('fax')?.value);
    formData.append('facebook', this.form.get('facebook')?.value);
    formData.append('twitter', this.form.get('twitter')?.value);
    formData.append('linkedin', this.form.get('linkedin')?.value);

    this._companyService.updateCompany(formData).subscribe(result => {
      if (result.succeeded) {
        this._toastrService.success('Saved Success!');
      } else {
        this._toastrService.success('Saved Fail!');
      }
    })
  }
}
