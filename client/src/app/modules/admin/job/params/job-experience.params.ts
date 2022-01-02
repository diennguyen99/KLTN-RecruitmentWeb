import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";

export class JobExperienceParams implements PaginatedFilter {
  searchString?: string;
  orderBy?: string;
  pageNumber!: number;
  pageSize!: number;
}
