import { PaginatedFilter } from "../models/filter/paginated-filter";

export class TagParams implements PaginatedFilter {
  pageNumber: number = 1;
  pageSize: number = 200;
  searchString?: string;
  orderBy?: string;
}
