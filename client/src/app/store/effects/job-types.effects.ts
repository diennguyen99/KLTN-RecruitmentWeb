import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as jobTypesActions from '../actions/job-types.action';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { JobTypeService } from "../../core/services/job-type.service";

@Injectable()
export class JobTypesEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _jobTypeService: JobTypeService
  ) {}

  loadJobTypes$ = createEffect(() => {
    return this._actions.pipe(
      ofType(jobTypesActions.loadJobTypes),
      mergeMap(() => this._jobTypeService.getJobTypes().pipe(
        map(({ data}) => jobTypesActions.loadJobTypesSuccess({ data }))
      ))
    )
  })

  addEditJobType$ = createEffect(() => {
    return this._actions.pipe(
      ofType(jobTypesActions.addEditJobType),
      concatMap(action =>
        this._jobTypeService.addEditJobType(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map((response) => jobTypesActions.addEditJobTypeSuccess({ data: {
                ...action.data,
                id: response.data
              } })),
          )
      )
    )
  })

  deleteEditJobType$ = createEffect(() => {
    return this._actions.pipe(
      ofType(jobTypesActions.deleteJobType),
      mergeMap(action =>
        this._jobTypeService.deleteJobType(action.id)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => jobTypesActions.deleteJobTypeSuccess({ id: action.id })),
          )
      )
    )
  })
}
