import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromJobTypes from '../reducers/job-type.reducer';

export const getJobTypeState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.jobTypes
);

export const getAllJobTypes = createSelector(
  getJobTypeState,
  fromJobTypes.getJobTypes
);

export const getJobTypesLoaded = createSelector(
  getJobTypeState,
  fromJobTypes.getJobTypesLoaded
);

export const getJobTypesLoading = createSelector(
  getJobTypeState,
  fromJobTypes.getJobTypesLoading
);
