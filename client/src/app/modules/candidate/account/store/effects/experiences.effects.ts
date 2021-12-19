import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as experiencesActions from '../actions/experiences.action';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { ExperiencesService } from "../../services";

@Injectable()
export class ExperiencesEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _experiencesService: ExperiencesService
  ) {}

  loadExperiences$ = createEffect(() => {
    return this._actions.pipe(
      ofType(experiencesActions.loadExperiences),
      mergeMap(() => this._experiencesService.getProfileExperiences().pipe(
        map(({ data}) => experiencesActions.loadExperiencesSuccess({ data }))
      ))
    )
  })

  addEditExperience$ = createEffect(() => {
    return this._actions.pipe(
      ofType(experiencesActions.addEditExperience),
      concatMap(action =>
        this._experiencesService.addEditProfileExperience(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map((response) => experiencesActions.addEditExperienceSuccess({ data: {
                ...action.data,
                id: response.data
              } })),
          )
      )
    )
  })

  deleteEditExperience$ = createEffect(() => {
    return this._actions.pipe(
      ofType(experiencesActions.deleteExperience),
      mergeMap(action =>
        this._experiencesService.deleteProfileExperience(action.id)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => experiencesActions.deleteExperienceSuccess({ id: action.id })),
          )
      )
    )
  })
}
