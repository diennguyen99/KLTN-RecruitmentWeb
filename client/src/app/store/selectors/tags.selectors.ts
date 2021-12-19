import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromTags from '../reducers/tags.reducer';

export const getTagState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.tags
);

export const getAllTags = createSelector(
  getTagState,
  fromTags.getTags
);

export const getTagsLoaded = createSelector(
  getTagState,
  fromTags.getTagsLoaded
);

export const getTagsLoading = createSelector(
  getTagState,
  fromTags.getTagsLoading
);
