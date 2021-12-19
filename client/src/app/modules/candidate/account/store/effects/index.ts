import { ExperiencesEffects } from './experiences.effects';
import { ProfileEffects } from "./profile.effects";
import { SkillsEffects } from "./skills.effects";
import { SkillsNameEffects } from "./skills-name.effects";
import { PortfoliosEffects } from "./portfolios.effects";
import { EducationsEffects } from "./educations.effects";
import { SummaryEffects } from "./summary.effects";

export const effects: any[] = [
  ExperiencesEffects,
  ProfileEffects,
  SkillsEffects,
  SkillsNameEffects,
  PortfoliosEffects,
  EducationsEffects,
  SummaryEffects
];

export * from './experiences.effects';
export * from './profile.effects';
export * from './skills.effects';
export * from './skills-name.effects';
export * from './portfolios.effects';
export * from './educations.effects';
export * from './summary.effects';
