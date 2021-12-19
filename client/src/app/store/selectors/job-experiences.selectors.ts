import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromJobExperiences from '../reducers/job-experiences.reducer';

export const getExperienceState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.jobExperiences
);

export const getAllJobExperiences = createSelector(
  getExperienceState,
  fromJobExperiences.getJobExperiences
);

export const getJobExperiencesLoaded = createSelector(
  getExperienceState,
  fromJobExperiences.getJobExperiencesLoaded
);

export const getJobExperiencesLoading = createSelector(
  getExperienceState,
  fromJobExperiences.getJobExperiencesLoading
);
