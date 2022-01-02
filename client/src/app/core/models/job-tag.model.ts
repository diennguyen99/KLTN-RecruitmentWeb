import { Job } from "./job.model";
import { Tag } from "./tag.model";

export class JobTag {
  id!: number;
  jobId?: number;
  tagId?: number;
  tag?: Tag;
  company?: string
  companyLogo?: string;
  city?: string;
  jobType?: string;
  jobExperience?: string;
  jobTitle?: string;
  jobSlug?: string;
  salaryFrom?: number;
  salaryTo?: number;
  decimal?: number;
  hideSalary?: boolean;
  jobCreatedOn?: string;
}
