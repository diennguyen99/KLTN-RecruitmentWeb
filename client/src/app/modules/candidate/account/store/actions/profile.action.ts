import { createAction, props } from "@ngrx/store";
import { Profile } from "../../models/profile.model";

// load profile
export const loadProfile = createAction(
  '[Profile] Load Profile'
)

export const loadProfileFail = createAction(
  '[Profile] Load Profile Fail',
  props<{ error: string }>()
)

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ data: Profile }>()
)

// save profile social
export const saveSocial = createAction(
  '[Profile] Load Social',
  props<{ data: any }>()
)

export const saveSocialFail = createAction(
  '[Profile] Save Social Fail',
  props<{ error: string }>()
)

export const saveSocialSuccess = createAction(
  '[Profile] Save Social Success',
  props<{ data: Profile}>()
)


// save profile
export const saveProfile = createAction(
  '[Profile] Save Profile',
  props<{ data: any }>()
)

export const saveProfileFail = createAction(
  '[Profile] Save Profile Fail',
  props<{ error: string }>()
)

export const saveProfileSuccess = createAction(
  '[Profile] Save Profile Success',
  props<{ data: Profile}>()
)
