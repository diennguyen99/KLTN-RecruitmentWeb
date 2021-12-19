import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class BusyService {

  busyRequestCount = 0;

  constructor(
    private readonly _spinnerService: NgxSpinnerService
  ) { }

  busy() {
    this.busyRequestCount++;
    this._spinnerService.show(undefined, {
      type: 'ball-atom',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      size: 'medium'
    })
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this._spinnerService.hide();
    }
  }
}
