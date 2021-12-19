import * as fromJobTypes from '../actions/job-types.action';
import { JobType } from '../../core/models/job-type.model';
import { createReducer, on } from "@ngrx/store";

export interface JobTypeState {
  data: JobType[],
  loaded: boolean,
  loading: boolean
}

export const initialState: JobTypeState = {
  data: [],
  loaded: false,
  loading: false
}

export const reducer = createReducer<JobTypeState>(
  initialState,
  on(fromJobTypes.loadJobTypes, (state): JobTypeState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromJobTypes.loadJobTypesSuccess, (state, actions): JobTypeState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: [...actions.data]
    }
  }),
  on(fromJobTypes.addEditJobTypeSuccess, (state, action): JobTypeState => {
    const jobType = action.data;
    const data = {
      ...state.data,
      [jobType.id]: jobType,
    };

    return {
      ...state,
      data,
    };
  }),
  on(fromJobTypes.deleteJobTypeSuccess, (state, action): JobTypeState => {
    const jobTypeId = action.id;
    const {
      [jobTypeId]: removed,
      ...data
    } = state.data;

    return {
      ...state,
      data,
    };
  })
)

export const getJobTypes = (state: JobTypeState) => state.data;
export const getJobTypesLoading = (state: JobTypeState) => state.loading;
export const getJobTypesLoaded = (state: JobTypeState) => state.loaded;
