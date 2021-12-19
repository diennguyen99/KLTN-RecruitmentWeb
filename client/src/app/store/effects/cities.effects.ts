import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as citiesActions from '../actions/cities.action';
import { mergeMap, map } from "rxjs/operators";
import { CitiesService } from "../../core/services/cities.service";

@Injectable()
export class CitiesEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _citiesService: CitiesService
  ) {}

  loadCities$ = createEffect(() => {
    return this._actions.pipe(
      ofType(citiesActions.loadCitiesName),
      mergeMap(action => this._citiesService.getCities(action.params).pipe(
        map(({ data }) => citiesActions.loadCitiesSuccess({ data }))
      ))
    )
  })
}
