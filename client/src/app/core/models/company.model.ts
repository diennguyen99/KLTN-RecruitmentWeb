import { Job } from "./job.model";

export class Company {
  id!: number;
  name?: string;
  slug?: string;
  email?: string;
  description?: string;
  address?: string;
  website?: string;
  establishedIn?: number;
  numberOfEmployees?: number;
  fax?: string;
  phone?: string;
  logo?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  jobs?: Job[];
}
