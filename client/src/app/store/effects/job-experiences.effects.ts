import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as jobExperiencesActions from '../actions/job-experiences.model';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { JobExperienceService } from "../../core/services/job-experience.service";

@Injectable()
export class JobExperiencesEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _jobExperienceService: JobExperienceService
  ) {}

  loadJobExperiences$ = createEffect(() => {
    return this._actions.pipe(
      ofType(jobExperiencesActions.loadJobExperiences),
      mergeMap(() => this._jobExperienceService.getJobExperiences().pipe(
        map(({ data}) => jobExperiencesActions.loadJobExperiencesSuccess({ data }))
      ))
    )
  })

  addEditJobExperience$ = createEffect(() => {
    return this._actions.pipe(
      ofType(jobExperiencesActions.addEditJobExperience),
      concatMap(action =>
        this._jobExperienceService.addEditJobExperience(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map((response) => jobExperiencesActions.addEditJobExperienceSuccess({ data: {
                ...action.data,
                id: response.data
              } })),
          )
      )
    )
  })

  deleteEditJobExperience$ = createEffect(() => {
    return this._actions.pipe(
      ofType(jobExperiencesActions.deleteJobExperience),
      mergeMap(action =>
        this._jobExperienceService.deleteJobExperience(action.id)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => jobExperiencesActions.deleteJobExperienceSuccess({ id: action.id })),
          )
      )
    )
  })
}
