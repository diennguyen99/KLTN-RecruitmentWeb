import * as fromSkillsName from '../actions/skill-name.action';
import { SkillName } from '../../models/skill-name.model';
import { createReducer, on } from "@ngrx/store";

export interface SkillNameState {
  data: SkillName[],
  loaded: boolean,
  loading: boolean
}

export const initialState: SkillNameState = {
  data: [],
  loaded: false,
  loading: false
}

export const reducer = createReducer<SkillNameState>(
  initialState,
  on(fromSkillsName.loadSkillsName, (state): SkillNameState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromSkillsName.loadSkillsNameSuccess, (state, actions): SkillNameState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: [...actions.data]
    }
  }),
  on(fromSkillsName.loadSkillsNameFail, (state): SkillNameState => {
    return {
      ...state,
      loading: false,
      loaded: false,
    }
  })
)

export const getSkillsName = (state: SkillNameState) => state.data;
export const getSkillsNameLoading = (state: SkillNameState) => state.loading;
export const getSkillsNameLoaded = (state: SkillNameState) => state.loaded;
