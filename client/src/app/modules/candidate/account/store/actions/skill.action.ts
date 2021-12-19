import { createAction, props } from "@ngrx/store";
import { Skill } from "../../models/skill.model";

// load skill
export const loadSkills = createAction(
  '[Skills] Load Skills'
)

export const loadSkillsFail = createAction(
  '[Skills] Load Skills Fail',
  props<{ error: string }>()
)

export const loadSkillsSuccess = createAction(
  '[Skills] Load Skills Success',
  props<{ data: Skill[] }>()
)

// add update Skill
export const addEditSkill = createAction(
  '[Skills] Add Edit Skills',
  props<{ data: any }>()
)

export const addEditSkillFail = createAction(
  '[Skills] Add Edit Skill Fail',
  props<{ error: string }>()
)

export const addEditSkillsuccess = createAction(
  '[Skills] Add Edit Skill Success',
  props<{ data: Skill }>()
)

// delete update Skill
export const deleteSkill = createAction(
  '[Skills] Delete Skills',
  props<{ id: number }>()
)

export const deleteSkillFail = createAction(
  '[Skills] Delete Skill Fail',
  props<{ error: string }>()
)

export const deleteSkillSuccess = createAction(
  '[Skills] Delete Skill Success',
  props<{ id: number }>()
)
