import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromSpinner from '../reducers/spinner.reducer';

export const getSpinnerState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.spinner
);

export const getSpinner = createSelector(
  getSpinnerState,
  fromSpinner.getSpinner
);
