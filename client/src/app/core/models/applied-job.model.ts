import { Company } from "./company.model";
import { Job } from "./job.model";
import { CV } from "./cv.model";

export class AppliedJob {
  id!: number;
  jobTitle?: string;
  cvUrl?: string;
  companyId?: number;
  company?: Company;
  jobId?: number;
  job?: Job;
  description?: string;
  myCVOnline?: true;
  cvId?: number;
  cv?: CV;
  createdOn?: string;
  createdBy?: string;
}
