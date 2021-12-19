import { createAction, props } from "@ngrx/store";

export const setLoadingSpinner = createAction(
  '[Spinner] Set Loading',
  props<{ isLoading: boolean }>()
)
