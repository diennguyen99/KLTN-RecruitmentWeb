import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as skillsNameActions from '../actions/skill-name.action';
import { mergeMap, map } from "rxjs/operators";
import { SkillNameService } from "../../services";

@Injectable()
export class SkillsNameEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _skillsNameService: SkillNameService
  ) {}

  loadSkillsName$ = createEffect(() => {
    return this._actions.pipe(
      ofType(skillsNameActions.loadSkillsName),
      mergeMap(action => this._skillsNameService.getSkillsName(action.params).pipe(
        map(({ data }) => skillsNameActions.loadSkillsNameSuccess({ data }))
      ))
    )
  })
}
