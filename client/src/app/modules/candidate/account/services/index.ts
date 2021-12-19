import { ExperiencesService } from './experiences.service';
import { ProfileService } from "./profile.service";
import { SkillService } from "./skill.service";
import { SkillNameService } from "./skill-name.service";
import { PortfolioService } from "./portfolio.service";
import { EducationsService } from "./educations.service";
import { SummaryService } from "./summary.service";

export const services: any[] = [
  ExperiencesService,
  ProfileService,
  SkillService,
  SkillNameService,
  PortfolioService,
  EducationsService,
  SummaryService
];

export * from './experiences.service';
export * from './profile.service';
export * from './skill.service';
export * from './skill-name.service';
export * from './portfolio.service';
export * from './educations.service';
export * from './summary.service';
