import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";

export class TagParams implements PaginatedFilter {
  searchString?: string;
  orderBy?: string;
  pageNumber!: number;
  pageSize!: number;
}
