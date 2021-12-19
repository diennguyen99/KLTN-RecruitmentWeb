import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as educationsActions from '../actions/educations.actions';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { EducationsService } from "../../services";

@Injectable()
export class EducationsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _educationsService: EducationsService
  ) {}

  loadEducations$ = createEffect(() => {
    return this._actions.pipe(
      ofType(educationsActions.loadEducations),
      mergeMap(() => this._educationsService.getProfileEducations().pipe(
        map(({ data}) => educationsActions.loadEducationsSuccess({ data }))
      ))
    )
  })

  addEditEducation$ = createEffect(() => {
    return this._actions.pipe(
      ofType(educationsActions.addEditEducation),
      concatMap(action =>
        this._educationsService.addEditProfileEducation(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map((response) => educationsActions.addEditEducationSuccess({ data: {
                ...action.data,
                id: response.data
              } })),
          )
      )
    )
  })

  deleteEditEducation$ = createEffect(() => {
    return this._actions.pipe(
      ofType(educationsActions.deleteEducation),
      mergeMap(action =>
        this._educationsService.deleteProfileEducation(action.id)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => educationsActions.deleteEducationSuccess({ id: action.id })),
          )
      )
    )
  })
}
