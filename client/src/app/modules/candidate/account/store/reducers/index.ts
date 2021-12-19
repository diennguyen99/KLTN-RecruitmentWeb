import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromExperiences from './experiences.reducer';
import * as fromProfile from './profile.reducer';
import * as fromSkills from './skills.reducer';
import * as fromSkillsName from './skills-name.reducer';
import * as fromPortfolios from './portfolios.reducer';
import * as fromEducations from './educations.reducer';
import * as fromSummary from './summary.reducer';

export interface AccountState {
  experiences: fromExperiences.ExperienceState;
  profile: fromProfile.ProfileState,
  skills: fromSkills.SkillState,
  skillsName: fromSkillsName.SkillNameState,
  portfolios: fromPortfolios.PortfolioState,
  educations: fromEducations.EducationState,
  summary: fromSummary.SummaryState,
}

export const reducers: ActionReducerMap<AccountState> = {
  experiences: fromExperiences.reducer,
  profile: fromProfile.reducer,
  skills: fromSkills.reducer,
  skillsName: fromSkillsName.reducer,
  portfolios: fromPortfolios.reducer,
  educations: fromEducations.reducer,
  summary: fromSummary.reducer
}

export const getAccountState = createFeatureSelector<AccountState>('account');


