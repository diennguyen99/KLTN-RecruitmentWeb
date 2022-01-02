import { JobService } from "./job.service";
import { JobTypeService } from "./job-type.service";
import { JobExperienceService } from "./job-experience.service";

export const services: any = [
  JobService,
  JobTypeService,
  JobExperienceService
]

export * from './job.service';
export * from './job-type.service';
export * from './job-experience.service';
