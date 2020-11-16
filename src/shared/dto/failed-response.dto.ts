import { CustomValidationError } from '../../exceptions/validation.exception';

export class FailedResponseDTO {
  errorMessage: string;

  errors?: CustomValidationError;

  errorType?: string;
}
