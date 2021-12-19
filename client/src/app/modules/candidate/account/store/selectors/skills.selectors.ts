import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromSkills from '../reducers/skills.reducer';

export const getSkillState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.skills
);

export const getSkillsEntities = createSelector(
  getSkillState,
  fromSkills.getSkillsEntities
);

export const getAllSkills = createSelector(
  getSkillsEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getSkillsLoaded = createSelector(
  getSkillState,
  fromSkills.getSkillsLoaded
);

export const getSkillsLoading = createSelector(
  getSkillState,
  fromSkills.getSkillsLoading
);
