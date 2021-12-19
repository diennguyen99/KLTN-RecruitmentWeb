import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";

export class SkillNameParams implements PaginatedFilter {
  pageNumber: number = 1;
  pageSize: number = 200;
  searchString?: string;
  orderBy?: string;
}
