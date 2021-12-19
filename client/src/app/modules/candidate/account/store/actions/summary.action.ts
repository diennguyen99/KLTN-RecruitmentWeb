import { createAction, props } from "@ngrx/store";
import { Summary } from "../../models/summary.model";

// load summary
export const loadSummary = createAction(
  '[Summary] Load Summary'
)

export const loadSummarySuccess = createAction(
  '[Summary] Load Summary Success',
  props<{ data: Summary }>()
)

// add update summary
export const addEditSummary = createAction(
  '[Summary] Add Edit Summary',
  props<{ data: Summary }>()
)

export const addEditSummarySuccess = createAction(
  '[Summary] Add Edit Summary Success',
  props<{ data: Summary }>()
)
