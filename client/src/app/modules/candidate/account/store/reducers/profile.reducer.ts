import * as fromProfile from '../actions/profile.action';
import { Profile } from '../../models/profile.model';
import { createReducer, on } from "@ngrx/store";

export interface ProfileState {
  data: Profile,
  loaded: boolean,
  loading: boolean
}

export const initialState: ProfileState = {
  data: {},
  loaded: false,
  loading: false
}

export const reducer = createReducer<ProfileState>(
  initialState,
  on(fromProfile.loadProfile, (state): ProfileState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromProfile.loadProfileSuccess, (state, action): ProfileState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.data
    }
  }),
  on(fromProfile.loadProfileFail, (state): ProfileState => {
    return {
      ...state,
      loading: false,
      loaded: false,
    }
  }),
  on(fromProfile.saveSocialSuccess, (state, action): ProfileState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: {...action.data}
    }
  }),
  on(fromProfile.saveProfileSuccess, (state, action): ProfileState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: {...action.data}
    }
  }),
)

export const getProfile = (state: ProfileState) => state.data;
export const getProfileLoading = (state: ProfileState) => state.loading;
export const getProfileLoaded = (state: ProfileState) => state.loaded;
