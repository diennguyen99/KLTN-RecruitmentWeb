import * as fromTags from '../actions/tags.action';
import { Tag } from '../../core/models/tag.model';
import { createReducer, on } from "@ngrx/store";

export interface TagState {
  data: Tag[],
  loaded: boolean,
  loading: boolean
}

export const initialState: TagState = {
  data: [],
  loaded: false,
  loading: false
}

export const reducer = createReducer<TagState>(
  initialState,
  on(fromTags.loadTags, (state): TagState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromTags.loadTagsSuccess, (state, actions): TagState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: [...actions.data]
    }
  }),
)

export const getTags = (state: TagState) => state?.data;
export const getTagsLoading = (state: TagState) => state.loading;
export const getTagsLoaded = (state: TagState) => state.loaded;
