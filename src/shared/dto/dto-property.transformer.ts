import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectType } from 'typeorm';

import { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } from '../constants/constants';

export const transformPage = (page: number): number => {
  page = Number(page);
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  return page;
};

export const transformLimit = (limit: number): number => {
  limit = Number(limit);
  if (isNaN(limit) || limit <= 0 || limit > MAX_PAGE_LIMIT) {
    limit = DEFAULT_PAGE_LIMIT;
  }

  return limit;
};

@Injectable()
export class TrimBodyPipe implements PipeTransform {
  transform<T>(requestParams: T, { type }: ArgumentMetadata): T {
    if (!type || type !== 'body') {
      return requestParams;
    }

    const trimValues = (acc: ObjectType<T>, [key, value]: [string, any]) => ({
      ...acc,
      [key]: typeof value === 'string' ? value.trim() : value,
    });

    return Object.entries(requestParams).reduce(trimValues, {}) as T;
  }
}
