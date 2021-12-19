import { createAction, props } from "@ngrx/store";
import { City } from "../../core/models/city.model";
import { CityParams } from "../../core/params/city.params";

// load experiences
export const loadCitiesName = createAction(
  '[City] Load Cities',
  props<{ params: CityParams }>()
)

export const loadCitiesSuccess = createAction(
  '[City] Load Cities Success',
  props<{ data: City[] }>()
)
