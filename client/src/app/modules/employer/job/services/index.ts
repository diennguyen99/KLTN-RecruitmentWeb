import { JobService } from "./job.service";
import { TagJobService } from "./tag-job.service";

export const services: any[] = [
  JobService,
  TagJobService
]

export * from './job.service';
export * from './tag-job.service';
