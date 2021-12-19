import * as fromExperiences from '../actions/job-experiences.model';
import { JobExperience } from '../../core/models/job-experience.model';
import { createReducer, on } from "@ngrx/store";

export interface JobExperienceState {
  data: JobExperience[],
  loaded: boolean,
  loading: boolean
}

export const initialState: JobExperienceState = {
  data: [],
  loaded: false,
  loading: false
}

export const reducer = createReducer<JobExperienceState>(
  initialState,
  on(fromExperiences.loadJobExperiences, (state): JobExperienceState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromExperiences.loadJobExperiencesSuccess, (state, actions): JobExperienceState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: [...actions.data]
    }
  }),
  on(fromExperiences.addEditJobExperienceSuccess, (state, action): JobExperienceState => {
    const jobExperience = action.data;
    const data = {
      ...state.data,
      [jobExperience.id]: jobExperience,
    };

    return {
      ...state,
      data,
    };
  }),
  on(fromExperiences.deleteJobExperienceSuccess, (state, action): JobExperienceState => {
    const jobExperienceId = action.id;
    const {
      [jobExperienceId]: removed,
      ...data
    } = state.data;

    return {
      ...state,
      data,
    };
  })
)

export const getJobExperiences = (state: JobExperienceState) => state.data;
export const getJobExperiencesLoading = (state: JobExperienceState) => state.loading;
export const getJobExperiencesLoaded = (state: JobExperienceState) => state.loaded;
