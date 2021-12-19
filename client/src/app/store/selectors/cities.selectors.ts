import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromCities from '../reducers/cities.reducer';

export const getCityState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state?.cities
);

export const getAllCities = createSelector(
  getCityState,
  fromCities?.getCities
);

export const getCitiesLoaded = createSelector(
  getCityState,
  fromCities.getCitiesLoaded
);

export const getCitiesLoading = createSelector(
  getCityState,
  fromCities.getECitiesLoading
);
