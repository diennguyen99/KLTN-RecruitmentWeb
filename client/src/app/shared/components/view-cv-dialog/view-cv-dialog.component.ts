import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { jsPDF } from "jspdf";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { CvOnline } from "../../../core/models/cv-online.model";
import { Result } from "../../../core/models/wrappers/Result";

@Component({
  selector: 'app-view-cv-dialog',
  templateUrl: './view-cv-dialog.component.html',
})
export class ViewCvDialogComponent implements OnInit {

  @ViewChild('content', { static: false }) element!: ElementRef;

  private baseUrl = environment.apiURL;
  cvOnline$!: Observable<Result<CvOnline>>;

  constructor(
    public dialogRef: MatDialogRef<ViewCvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private readonly _http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cvOnline$ = this._http.get<Result<CvOnline>>(
      this.baseUrl + 'CV/GetCVOnline', { params: { userId: this.userId }}
    );
  }

  makePDF() {

  }
}
