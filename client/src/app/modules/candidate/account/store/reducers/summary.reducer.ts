import * as fromSummary from '../actions/summary.action';
import { Summary } from '../../models/summary.model';
import { createReducer, on } from "@ngrx/store";

export interface SummaryState {
  data: Summary,
  loaded: boolean,
  loading: boolean
}

export const initialState: SummaryState = {
  data: new Summary(),
  loaded: false,
  loading: false
}

export const reducer = createReducer<SummaryState>(
  initialState,
  on(fromSummary.loadSummary, (state): SummaryState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromSummary.loadSummarySuccess, (state, action): SummaryState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.data
    }
  }),
  on(fromSummary.addEditSummarySuccess, (state, action): SummaryState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: {...action.data}
    }
  }),
)

export const getSummary = (state: SummaryState) => state.data;
export const getSummaryLoading = (state: SummaryState) => state.loading;
export const getSummaryLoaded = (state: SummaryState) => state.loaded;
