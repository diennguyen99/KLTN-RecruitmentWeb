import { createAction, props } from "@ngrx/store";
import { Experience } from "../../models/experience.model";

// load experiences
export const loadExperiences = createAction(
  '[Experiences] Load Experiences'
)

export const loadExperiencesFail = createAction(
  '[Experiences] Load Experiences Fail',
  props<{ error: string }>()
)

export const loadExperiencesSuccess = createAction(
  '[Experiences] Load Experiences Success',
  props<{ data: Experience[] }>()
)

// add update experience
export const addEditExperience = createAction(
  '[Experiences] Add Edit Experiences',
  props<{ data: Experience }>()
)

export const addEditExperienceFail = createAction(
  '[Experiences] Add Edit Experience Fail',
  props<{ error: string }>()
)

export const addEditExperienceSuccess = createAction(
  '[Experiences] Add Edit Experience Success',
  props<{ data: Experience }>()
)

// delete update experience
export const deleteExperience = createAction(
  '[Experiences] Delete Experiences',
  props<{ id: number }>()
)

export const deleteExperienceFail = createAction(
  '[Experiences] Delete Experience Fail',
  props<{ error: string }>()
)

export const deleteExperienceSuccess = createAction(
  '[Experiences] Delete Experience Success',
  props<{ id: number }>()
)
