import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as profileActions from '../actions/profile.action';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { ProfileService } from "../../services/profile.service";

@Injectable()
export class ProfileEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _profileService: ProfileService
  ) {}

  loadProfile$ = createEffect(() => {
    return this._actions.pipe(
      ofType(profileActions.loadProfile),
      mergeMap(() => this._profileService.getProfile().pipe(
        map(({ data}) => profileActions.loadProfileSuccess({ data }))
      ))
    )
  })

  saveProfileSocial$ = createEffect(() => {
    return this._actions.pipe(
      ofType(profileActions.saveSocial),
      concatMap(action =>
        this._profileService.saveProfileSocial(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => profileActions.saveSocialSuccess({ data: action.data }))
          )
      )
    )
  })

  saveProfile$ = createEffect(() => {
    return this._actions.pipe(
      ofType(profileActions.saveProfile),
      concatMap(action =>
        this._profileService.saveProfile(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => profileActions.saveProfileSuccess({ data: action.data }))
          )
      )
    )
  })
}
