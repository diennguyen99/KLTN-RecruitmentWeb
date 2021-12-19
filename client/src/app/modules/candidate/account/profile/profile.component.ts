import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from "../store";

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {

  formProfile!: FormGroup;
  formSocial!: FormGroup;
  isBeingSubmitProfile: boolean = false;
  isBeingSubmitSocial: boolean = false;
  storeSubscription!: Subscription;

  constructor(
    private readonly _store: Store<fromStore.AccountState>,
    private readonly _fb: FormBuilder,
    private readonly _toastrSerive: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initialFormProfile();
    this.initialFormSocial();

    this.storeSubscription = this._store.select(fromStore.getProfile).subscribe((currentProfile) => {
      this.formProfile.patchValue(currentProfile);
      this.formSocial.patchValue(currentProfile);
    })
  }

  private initialFormProfile() {
    this.formProfile = this._fb.group({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })
  }

  private initialFormSocial() {
    this.formSocial = this._fb.group({
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      linkedin: new FormControl(''),
      blog: new FormControl(''),
    })
  }

  public async onSubmitProfile() {
    if (this.formProfile.valid) {
      const data = this.formProfile.value;
      delete data.userName;
      this.isBeingSubmitProfile = true;
      this.formProfile.disable();
      this._store.dispatch(fromStore.saveProfile({ data: { ...this.formProfile.value, ...this.formSocial.value} }));
      setTimeout(() => {
        this.formProfile.enable();
        this.isBeingSubmitProfile = false;
        this._toastrSerive.success('Update Profile Success!');
      }, 1000)
    }
  }

  public async onSubmitSocial() {
    if(this.formSocial.valid) {
      this.isBeingSubmitSocial = true;
      this.formSocial.disable();
      this._store.dispatch(fromStore.saveSocial({ data: { ...this.formProfile.value, ...this.formSocial.value} }));
      setTimeout(() => {
        this.formSocial.enable();
        this.isBeingSubmitSocial = false;
        this._toastrSerive.success('Update Social Success!');
      }, 1000)
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
