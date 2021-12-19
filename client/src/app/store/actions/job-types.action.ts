import { createAction, props } from "@ngrx/store";
import { JobType } from "src/app/core/models/job-type.model";

// load job types
export const loadJobTypes = createAction(
  '[JobTypes] Load JobTypes'
)

export const loadJobTypesSuccess = createAction(
  '[JobTypes] Load JobTypes Success',
  props<{ data: JobType[] }>()
)

// add update job type
export const addEditJobType = createAction(
  '[JobTypes] Add Edit JobType',
  props<{ data: JobType }>()
)

export const addEditJobTypeSuccess = createAction(
  '[JobTypes] Add Edit JobType Success',
  props<{ data: JobType }>()
)

// delete update job type
export const deleteJobType = createAction(
  '[JobTypes] Delete JobType',
  props<{ id: number }>()
)

export const deleteJobTypeSuccess = createAction(
  '[JobTypes] Delete JobType Success',
  props<{ id: number }>()
)
