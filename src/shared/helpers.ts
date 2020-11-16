import slug from 'slug';

import { SLUG_SEPARATOR } from './constants/constants';
import { ValidationError } from '@nestjs/common';
import { CustomValidationError } from '../exceptions/validation.exception';

// the only reason for this function is to wrap the slug() function, to easily mocked it in jest unit tests
export const generateSlug = (string: string, separator = SLUG_SEPARATOR): string => {
  return slug(string, separator);
};

export const mapErrorMessagesFromValidator = (
  messages: CustomValidationError,
  error: ValidationError,
): CustomValidationError => ({
  ...messages,
  [error.property]:
    error.constraints || !error.children || error.children.length === 0
      ? Object.values(error.constraints || [])
      : error.children.reduce(mapErrorMessagesFromValidator, {}),
});

export const splitCamelCase = (rawString: string, toLowerCase = false): string => {
  let result = rawString;

  if (rawString && rawString.length > 0) {
    result = rawString.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  return result && toLowerCase ? result.toLowerCase() : result;
};
