import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as tagsActions from '../actions/tags.action';
import { mergeMap, map } from "rxjs/operators";
import { TagService } from "../../core/services/tag.service";

@Injectable()
export class TagsEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _tagService: TagService
  ) {}

  loadTags$ = createEffect(() => {
    return this._actions.pipe(
      ofType(tagsActions.loadTags),
      mergeMap(action => this._tagService.getTags(action.params).pipe(
        map(({ data }) => tagsActions.loadTagsSuccess({ data }))
      ))
    )
  })
}
