import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromSummary from '../reducers/summary.reducer';

export const getSummaryState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.summary
);

export const getSummary = createSelector(
  getSummaryState,
  fromSummary.getSummary
);

export const getSummaryLoaded = createSelector(
  getSummaryState,
  fromSummary.getSummaryLoaded
);

export const getSummaryLoading = createSelector(
  getSummaryState,
  fromSummary.getSummaryLoading
);
