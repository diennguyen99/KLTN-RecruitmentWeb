import { createAction, props } from "@ngrx/store";
import { SkillName } from "../../models/skill-name.model";
import { SkillNameParams } from "../../params/skill-name.params";

// load experiences
export const loadSkillsName = createAction(
  '[Skills Name] Load Skills Name',
  props<{ params: SkillNameParams }>()
)

export const loadSkillsNameFail = createAction(
  '[Skills Name] Load Skills Name Fail',
  props<{ error: string }>()
)

export const loadSkillsNameSuccess = createAction(
  '[Skills Name] Load Skills Name Success',
  props<{ data: SkillName[] }>()
)
