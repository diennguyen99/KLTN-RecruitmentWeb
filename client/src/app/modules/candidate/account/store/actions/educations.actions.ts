import { createAction, props } from "@ngrx/store";
import { Education } from "../../models/education.model";

// load educations
export const loadEducations = createAction(
  '[Educations] Load Educations'
)

export const loadEducationsSuccess = createAction(
  '[Educations] Load Educations Success',
  props<{ data: Education[] }>()
)

// add update education
export const addEditEducation = createAction(
  '[Educations] Add Edit Education',
  props<{ data: Education }>()
)

export const addEditEducationSuccess = createAction(
  '[Educations] Add Edit Education Success',
  props<{ data: Education }>()
)

// delete update education
export const deleteEducation = createAction(
  '[Educations] Delete Education',
  props<{ id: number }>()
)

export const deleteEducationSuccess = createAction(
  '[Educations] Delete Education Success',
  props<{ id: number }>()
)
