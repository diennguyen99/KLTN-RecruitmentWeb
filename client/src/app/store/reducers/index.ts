import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromSpinner from './spinner.reducer';
import * as fromCities from './cities.reducer';
import * as fromTags from './tags.reducer';
import * as fromJobTypes from './job-type.reducer';
import * as fromJobExperiences from './job-experiences.reducer';

export interface AppState {
  spinner: fromSpinner.SpinnerState;
  cities: fromCities.CityState,
  tags: fromTags.TagState,
  jobTypes: fromJobTypes.JobTypeState,
  jobExperiences: fromJobExperiences.JobExperienceState
}

export const reducers: ActionReducerMap<AppState> = {
  spinner: fromSpinner.reducer,
  cities: fromCities.reducer,
  tags: fromTags.reducer,
  jobTypes: fromJobTypes.reducer,
  jobExperiences: fromJobExperiences.reducer,
}

export const getAppState = createFeatureSelector<AppState>('appRoot');
