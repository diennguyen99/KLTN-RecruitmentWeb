import { createAction, props } from "@ngrx/store";
import { JobExperience } from "src/app/core/models/job-experience.model";

// load job types
export const loadJobExperiences = createAction(
  '[JobExperiences] Load Job Experiences'
)

export const loadJobExperiencesSuccess = createAction(
  '[JobExperiences] Load Job Experiences Success',
  props<{ data: JobExperience[] }>()
)

// add update job type
export const addEditJobExperience = createAction(
  '[JobExperiences] Add Edit JobExperience',
  props<{ data: JobExperience }>()
)

export const addEditJobExperienceSuccess = createAction(
  '[JobExperiences] Add Edit Job Experience Success',
  props<{ data: JobExperience }>()
)

// delete update job type
export const deleteJobExperience = createAction(
  '[JobExperiences] Delete Job Experience',
  props<{ id: number }>()
)

export const deleteJobExperienceSuccess = createAction(
  '[JobExperiences] Delete Job Experience Success',
  props<{ id: number }>()
)
