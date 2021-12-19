import { City } from "./city.model";
import { Company } from "./company.model";
import { JobType } from "./job-type.model";
import { JobExperience } from "./job-experience.model";

export class Job {
  id!: number;
  companyId?: number;
  company?: Company;
  cityId?: number;
  city?: City;
  jobType?: JobType;
  jobTypeId?: number;
  jobExperience?: JobExperience;
  jobExperienceId?: number;
  title?: string;
  slug?: string;
  description?: string;
  benefits?: string;
  requirements?: string;
  salaryFrom?: number;
  salaryTo?: number;
  hideSalary?: boolean;
  numOfPositions?: number;
  dateStart?: string;
  dateEnd?: string;
  createdOn?: string;
}
