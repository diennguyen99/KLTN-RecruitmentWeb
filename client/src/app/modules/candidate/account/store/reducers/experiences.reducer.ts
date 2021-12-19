import * as fromExperiences from '../actions/experiences.action';
import { Experience } from '../../models/experience.model';
import { createReducer, on } from "@ngrx/store";

export interface ExperienceState {
  entities: { [id: number] : Experience },
  loaded: boolean,
  loading: boolean
}

export const initialState: ExperienceState = {
  entities: {},
  loaded: false,
  loading: false
}

export const reducer = createReducer<ExperienceState>(
  initialState,
  on(fromExperiences.loadExperiences, (state): ExperienceState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromExperiences.loadExperiencesSuccess, (state, actions): ExperienceState => {
    const experiences = actions.data;

    const entities = experiences.reduce(
      (entities: { [id: number]: Experience }, experience: Experience) => {
        return {
          ...entities,
          [experience.id]: experience,
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
  on(fromExperiences.loadExperiencesFail, (state): ExperienceState => {
    return {
      ...state,
      loading: false,
      loaded: false,
    }
  }),
  on(fromExperiences.addEditExperienceSuccess, (state, action): ExperienceState => {
    const experience = action.data;
    const entities = {
      ...state.entities,
      [experience.id]: experience,
    };

    return {
      ...state,
      entities,
    };
  }),
  on(fromExperiences.deleteExperienceSuccess, (state, action): ExperienceState => {
    const experienceId = action.id;
    const {
      [experienceId]: removed,
      ...entities
    } = state.entities;

    return {
      ...state,
      entities,
    };
  })
)

export const getExperiencesEntities = (state: ExperienceState) => state.entities;
export const getExperiencesLoading = (state: ExperienceState) => state.loading;
export const getExperiencesLoaded = (state: ExperienceState) => state.loaded;
