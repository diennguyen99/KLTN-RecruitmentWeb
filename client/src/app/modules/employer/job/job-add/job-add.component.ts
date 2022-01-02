import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";
import slugify from "slugify";
import { JobService, TagJobService } from "../services";
import { Observable } from "rxjs";
import { JobType } from "../../../../core/models/job-type.model";
import { JobExperience } from "../../../../core/models/job-experience.model";
import { City } from "../../../../core/models/city.model";
import { ToastrService } from "ngx-toastr";
import { AddTagJobDialogComponent } from "../components/add-tag-job-dialog/add-tag-job-dialog.component";
import { JobTag } from "../../../../core/models/job-tag.model";

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
})
export class JobAddComponent implements OnInit {

  title: string = 'Add New';
  form!: FormGroup;

  jobTypes$!: Observable<JobType[]>;
  jobExperiences$!: Observable<JobExperience[]>;
  cities$!: Observable<City[]>;
  jobTags!: JobTag[];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _jobService: JobService,
    private readonly _fb: FormBuilder,
    private readonly _storeApp: Store<fromStore.AppState>,
    private readonly _toastrService: ToastrService,
    private readonly _dialog: MatDialog,
    private readonly _tagJobService: TagJobService,
  ) { }

  ngOnInit(): void {
    this.initialForm();
    this.loadDataForm();
    this._route.paramMap.subscribe(params => {
      const paramsId = params.get('id');
      if (paramsId) {
        this.title = 'Edit';
        this._jobService.getJobById(parseInt(paramsId, 10)).subscribe((result) => {
          this.form.patchValue(result.data);
        })

        this._tagJobService.getJobTagsById(parseInt(paramsId, 10)).subscribe(result => {
          this.jobTags = result.data;
        })
      }
    });
  }

  private initialForm(){
    this.form = this._fb.group({
      id: [0],
      title: ['', Validators.required],
      slug: [''],
      description: ['', Validators.required],
      benefits: ['', Validators.required],
      requirements: ['', Validators.required],
      salaryFrom: [''],
      salaryTo: [''],
      hideSalary: [false],
      numOfPositions: [1, Validators.required],
      dateStart: [Date.now, Validators.required],
      dateEnd: [Date.now, Validators.required],
      cityId: [1, Validators.required],
      jobTypeId: [1, Validators.required],
      jobExperienceId: [1, Validators.required],
    })
  }

  private loadDataForm() {
    this.jobTypes$ = this._storeApp.select(fromStore.getAllJobTypes);
    this.jobExperiences$ = this._storeApp.select(fromStore.getAllJobExperiences);
    this.cities$ = this._storeApp.select(fromStore.getAllCities);
  }

  private getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateSlugTitle(): string {
    return slugify(this.form.get('title')?.value ?? '') + '-' + this.getRndInteger(1000, 9999)
  }

  onSubmit() {
    let data;
    if (this.title === 'Edit') {
      data = {
        ...this.form.value,
        dateStart: new Date(this.form.get('dateStart')?.value).toISOString(),
        dateEnd: new Date(this.form.get('dateEnd')?.value).toISOString()
      }
    } else {
      data = {
        ...this.form.value,
        slug: this.generateSlugTitle(),
        dateStart: new Date(this.form.get('dateStart')?.value).toISOString(),
        dateEnd: new Date(this.form.get('dateEnd')?.value).toISOString()
      }
    }

    this._jobService.createJob(data).subscribe(result => {
      if (result.succeeded) {
        this._toastrService.success('Saved Success!');
        if (this.title !== 'Edit'){
          this.addTagJobDialog(result.data.id,true);
          this._router.navigate(['/employer/job']);
        }
      } else {
        this._toastrService.error('Saved Fail!')
      }
    })
  }

  addTagJobDialog(jobId: number = 0, isDisableClose:boolean = false, id: number = 0, tag = '') {
    if (jobId != 0) {
      const dialogRef = this._dialog.open(AddTagJobDialogComponent, {
        width: '30%',
        data: {
          id,
          jobId,
          tag
        },
        disableClose: isDisableClose
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this._tagJobService.getJobTagsById(jobId).subscribe(result => {
            this.jobTags = result.data;
          })
        }
      });
    }
  }
}
