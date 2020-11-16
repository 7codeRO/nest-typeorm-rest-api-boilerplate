import { BadRequestException } from '@nestjs/common';

export interface CustomValidationError {
  [key: string]: CustomValidationError | string[];
}

export class CustomValidationException extends BadRequestException {
  constructor(public validationErrors: CustomValidationError) {
    super();
  }
}
