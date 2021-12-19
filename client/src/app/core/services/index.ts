import { AuthService } from "./auth.service";
import { BusyService } from "./busy.service";
import { CitiesService } from "./cities.service";
import { LocalStorageService } from "./local-storage.service";
import { UserService } from "./user.service";
import { TagService } from "./tag.service";
import { JobTypeService } from "./job-type.service";
import { JobExperienceService } from "./job-experience.service";

export const services: any[] = [
  AuthService,
  BusyService,
  CitiesService,
  LocalStorageService,
  UserService,
  TagService,
  JobTypeService,
  JobExperienceService
];

export * from "./auth.service";
export * from "./busy.service";
export * from "./cities.service";
export * from "./local-storage.service";
export * from "./user.service";
export * from './tag.service';
export * from './job-type.service';
export * from './job-experience.service';
