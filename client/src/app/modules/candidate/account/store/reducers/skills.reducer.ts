import * as fromSkills from '../actions/skill.action';
import { Skill } from '../../models/skill.model';
import { createReducer, on } from "@ngrx/store";

export interface SkillState {
  entities: { [id: number] : Skill },
  loaded: boolean,
  loading: boolean
}

export const initialState: SkillState = {
  entities: {},
  loaded: false,
  loading: false
}

export const reducer = createReducer<SkillState>(
  initialState,
  on(fromSkills.loadSkills, (state): SkillState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromSkills.loadSkillsSuccess, (state, actions): SkillState => {
    const skills = actions.data;

    const entities = skills.reduce(
      (entities: { [id: number]: Skill }, skill: Skill) => {
        return {
          ...entities,
          [skill.id]: skill,
        };
      },
      {
        ...state.entities,
      }
    );
    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    }
  }),
  on(fromSkills.loadSkillsFail, (state): SkillState => {
    return {
      ...state,
      loading: false,
      loaded: false,
    }
  }),
  on(fromSkills.addEditSkillsuccess, (state, action): SkillState => {
    const skill = action.data;
    const entities = {
      ...state.entities,
      [skill.id]: skill,
    };

    return {
      ...state,
      entities,
    };
  }),
  on(fromSkills.deleteSkillSuccess, (state, action): SkillState => {
    const skillId = action.id;
    const {
      [skillId]: removed,
      ...entities
    } = state.entities;

    return {
      ...state,
      entities,
    };
  })
)

export const getSkillsEntities = (state: SkillState) => state.entities;
export const getSkillsLoading = (state: SkillState) => state.loading;
export const getSkillsLoaded = (state: SkillState) => state.loaded;
