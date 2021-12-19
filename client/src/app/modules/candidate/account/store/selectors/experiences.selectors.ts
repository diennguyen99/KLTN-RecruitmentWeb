import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromExperiences from '../reducers/experiences.reducer';

export const getExperienceState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.experiences
);

export const getExperiencesEntities = createSelector(
  getExperienceState,
  fromExperiences.getExperiencesEntities
);

export const getAllExperiences = createSelector(
  getExperiencesEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getExperiencesLoaded = createSelector(
  getExperienceState,
  fromExperiences.getExperiencesLoaded
);

export const getExperiencesLoading = createSelector(
  getExperienceState,
  fromExperiences.getExperiencesLoading
);
