import { PaginationDTO } from './pagination.dto';
import { SortOrderDTO } from './sort-order.dto';

export class BasicPaginationDTO {
  pagination?: PaginationDTO;

  sortOrder?: SortOrderDTO;
}

export class BasicResponseDTO {
  message: string;
}

export class DefaultResponseDTO<T> extends BasicResponseDTO {
  data?: T;
}

export class PaginationResponseDTO<T> extends BasicPaginationDTO {
  message: string;

  data?: T;
}
