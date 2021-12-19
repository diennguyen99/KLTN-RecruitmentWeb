import * as fromSpinner from '../actions/spinner.action';
import { createReducer, on } from "@ngrx/store";

export interface SpinnerState {
  loading: boolean
}

export const initialState: SpinnerState = {
  loading: false
}

export const reducer = createReducer<SpinnerState>(
  initialState,
  on(fromSpinner.setLoadingSpinner, (state, action): SpinnerState => {
    return {
      ...state,
      loading: action.isLoading,
    }
  }),
)

export const getSpinner = (state: SpinnerState) => state.loading;
