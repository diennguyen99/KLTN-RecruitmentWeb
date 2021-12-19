import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromEducations from '../reducers/educations.reducer';

export const getEducationState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.educations
);

export const getEducationsEntities = createSelector(
  getEducationState,
  fromEducations.getEducationsEntities
);

export const getAllEducations = createSelector(
  getEducationsEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getEducationsLoaded = createSelector(
  getEducationState,
  fromEducations.getEducationsLoaded
);

export const getEducationsLoading = createSelector(
  getEducationState,
  fromEducations.getEducationsLoading
);
