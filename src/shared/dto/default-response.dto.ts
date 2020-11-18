import { BasicPaginationDTO } from './pagination.dto';

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
