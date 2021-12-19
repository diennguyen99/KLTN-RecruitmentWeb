import { SkillName } from "./skill-name.model";

export class Skill {
  id!: number;
  skillId?: number;
  skill?: SkillName;
  scores?: number;
}
