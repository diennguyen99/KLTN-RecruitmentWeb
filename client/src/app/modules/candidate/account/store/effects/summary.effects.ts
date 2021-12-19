import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as summaryActions from '../actions/summary.action';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { SummaryService } from "../../services/summary.service";

@Injectable()
export class SummaryEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _summaryService: SummaryService
  ) {}

  loadSummary$ = createEffect(() => {
    return this._actions.pipe(
      ofType(summaryActions.loadSummary),
      mergeMap(() => this._summaryService.getProfileSummary().pipe(
        map(({ data}) => summaryActions.loadSummarySuccess({ data }))
      ))
    )
  })

  addEditSummary$ = createEffect(() => {
    return this._actions.pipe(
      ofType(summaryActions.addEditSummary),
      concatMap(action =>
        this._summaryService.addEditProfileSummary(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map(({ data }) => summaryActions.addEditSummarySuccess({ data }))
          )
      )
    )
  })
}
