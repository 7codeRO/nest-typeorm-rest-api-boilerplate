import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { DEFAULT_PAGE_LIMIT, OrderDirection } from '../constants/constants';
import { transformLimit, transformPage } from './dto-property.transformer';
import { DEFAULT_SORT_BY } from '../constants/constants';

export class SortOrderDTO {
  @IsOptional()
  order?: OrderDirection = OrderDirection.DESC;

  @IsOptional()
  sortBy?: string = DEFAULT_SORT_BY;
}

export class PaginationParamsDTO {
  @IsOptional()
  @Transform(
    (page) => {
      return transformPage(page);
    },
    { toClassOnly: true },
  )
  page?: number = 1;

  @IsOptional()
  @Transform(
    (limit) => {
      return transformLimit(limit);
    },
    { toClassOnly: true },
  )
  limit?: number = DEFAULT_PAGE_LIMIT;
}

export class PaginationDTO extends PaginationParamsDTO {
  totalPages: number;

  totalCount: number;
}

export class BasicPaginationDTO {
  pagination?: PaginationDTO;

  sortOrder?: SortOrderDTO;
}
