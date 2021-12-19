import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromSkillsName from '../reducers/skills-name.reducer';

export const getSkillNameState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.skillsName
);

export const getAllSkillsName = createSelector(
  getSkillNameState,
  fromSkillsName.getSkillsName
);
