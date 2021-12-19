import { createAction, props } from "@ngrx/store";
import { Tag } from "../../core/models/tag.model";
import { TagParams } from "../../core/params/tag.params";

// load tags
export const loadTags = createAction(
  '[Tags] Load Tags',
  props<{ params: TagParams }>()
)

export const loadTagsSuccess = createAction(
  '[Tags] Load Tags Success',
  props<{ data: Tag[] }>()
)
