import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as PortfoliosActions from '../actions/portfolios.action';
import { mergeMap, map, concatMap, filter } from "rxjs/operators";
import { PortfolioService } from "../../services";

@Injectable()
export class PortfoliosEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _portfolioService: PortfolioService
  ) {}

  loadPortfolios$ = createEffect(() => {
    return this._actions.pipe(
      ofType(PortfoliosActions.loadPortfolios),
      mergeMap(() => this._portfolioService.getProfilePortfolios().pipe(
        map(({ data}) => PortfoliosActions.loadPortfoliosSuccess({ data }))
      ))
    )
  })

  addEditPortfolio$ = createEffect(() => {
    return this._actions.pipe(
      ofType(PortfoliosActions.addEditPortfolio),
      concatMap(action =>
        this._portfolioService.addEditProfilePortfolio(action.data)
          .pipe(
            filter(e => e.succeeded == true),
            map(({ data }) => PortfoliosActions.addEditPortfolioSuccess({ data })),
          )
      )
    )
  })

  deleteEditPortfolio$ = createEffect(() => {
    return this._actions.pipe(
      ofType(PortfoliosActions.deletePortfolio),
      mergeMap(action =>
        this._portfolioService.deleteProfilePortfolio(action.id)
          .pipe(
            filter(e => e.succeeded == true),
            map(() => PortfoliosActions.deletePortfolioSuccess({ id: action.id })),
          )
      )
    )
  })
}
