import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromProfile from '../reducers/profile.reducer';

export const getProfileState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.profile
);

export const getProfile = createSelector(
  getProfileState,
  fromProfile.getProfile
);

export const getProfileLoaded = createSelector(
  getProfileState,
  fromProfile.getProfileLoaded
);

export const getProfileLoading = createSelector(
  getProfileState,
  fromProfile.getProfileLoading
);
