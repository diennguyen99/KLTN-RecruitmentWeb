import { CitiesEffects } from "./cities.effects";
import { TagsEffects } from "./tags.effects";
import { JobTypesEffects } from "./job-types.effects";
import { JobExperiencesEffects } from "./job-experiences.effects";

export const effects: any[] = [
  CitiesEffects,
  TagsEffects,
  JobTypesEffects,
  JobExperiencesEffects
];

export * from './cities.effects';
export * from './tags.effects';
export * from './job-types.effects';
export * from './job-experiences.effects';
