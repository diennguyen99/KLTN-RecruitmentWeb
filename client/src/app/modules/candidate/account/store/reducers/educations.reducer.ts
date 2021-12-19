import * as fromEducations from '../actions/educations.actions';
import { Education } from '../../models/education.model';
import { createReducer, on } from "@ngrx/store";

export interface EducationState {
  entities: { [id: number] : Education },
  loaded: boolean,
  loading: boolean
}

export const initialState: EducationState = {
  entities: {},
  loaded: false,
  loading: false
}

export const reducer = createReducer<EducationState>(
  initialState,
  on(fromEducations.loadEducations, (state): EducationState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromEducations.loadEducationsSuccess, (state, actions): EducationState => {
    const educations = actions.data;

    const entities = educations.reduce(
      (entities: { [id: number]: Education }, education: Education) => {
        return {
          ...entities,
          [education.id]: education,
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
  on(fromEducations.addEditEducationSuccess, (state, action): EducationState => {
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
  on(fromEducations.deleteEducationSuccess, (state, action): EducationState => {
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

export const getEducationsEntities = (state: EducationState) => state.entities;
export const getEducationsLoading = (state: EducationState) => state.loading;
export const getEducationsLoaded = (state: EducationState) => state.loaded;
