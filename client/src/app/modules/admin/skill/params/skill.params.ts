import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";

export class SkillParams implements PaginatedFilter {
  searchString?: string;
  orderBy?: string = 'createdOn desc';
  pageNumber!: number;
  pageSize!: number;
}
