import { PaginatedFilter } from "../../../../core/models/filter/paginated-filter";

export class ApplicantParams implements PaginatedFilter {
  pageNumber!: number;
  pageSize!: number;
  jobTitle?: string;
}
