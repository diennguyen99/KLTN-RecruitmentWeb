import { Skill } from "../../modules/candidate/account/models/skill.model";
import { Education } from "../../modules/candidate/account/models/education.model";
import { Experience } from "../../modules/candidate/account/models/experience.model";
import { Portfolio } from "../../modules/candidate/account/models/portfolio.model";

export class CvOnline {
  id!: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  age?: number;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  blog?: string;
  summary?: any;
  skills?: Skill[];
  educations?: Education[];
  experiences?: Experience[];
  projects?: Portfolio[];
}
