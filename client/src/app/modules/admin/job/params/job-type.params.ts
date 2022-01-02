import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";

export class JobTypeParams implements PaginatedFilter {
  searchString?: string;
  orderBy?: string;
  pageNumber!: number;
  pageSize!: number;
}
