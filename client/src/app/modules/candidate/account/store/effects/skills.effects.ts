import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as skillsActions from '../actions/skill.action';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { SkillService } from "../../services";

@Injectable()
export class SkillsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _skillsService: SkillService
  ) {}

  loadSkills$ = createEffect(() => {
    return this._actions.pipe(
      ofType(skillsActions.loadSkills),
      mergeMap(() => this._skillsService.getProfileSkills().pipe(
        map(({ data }) => skillsActions.loadSkillsSuccess({ data }))
      ))
    )
  })

  addEditSkill$ = createEffect(() => {
    return this._actions.pipe(
      ofType(skillsActions.addEditSkill),
      concatMap(action =>
        this._skillsService.addEditProfileSkill(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map((response) => skillsActions.addEditSkillsuccess({ data: {
              id: response.data,
              skillId: action.data.id,
              scores: action.data.scores,
              skill: {
                id: action.data.id,
                name: action.data.name
              }
              } })),
          )
      )
    )
  })

  deleteEditSkill$ = createEffect(() => {
    return this._actions.pipe(
      ofType(skillsActions.deleteSkill),
      mergeMap(action =>
        this._skillsService.deleteProfileSkill(action.id)
          .pipe(
            filter(s => s.succeeded == true),
            map(() => skillsActions.deleteSkillSuccess({ id: action.id })),
          )
      )
    )
  })
}
