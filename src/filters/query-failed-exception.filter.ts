import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { MyLogger } from '../modules/logger/logger.service';
import { FailedResponseDTO } from '../shared/dto/failed-response.dto';
import { PS_EXCEPTIONS } from '../shared/constants/postgres-constants';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedExceptionI, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = 500;

    const errorType = PS_EXCEPTIONS[exception.code] || 'Database Error';

    const logger = new MyLogger();
    logger.setContext('QueryFailedException');
    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDTO = {
      errorMessage: exception.message,
      errorType: errorType,
    };

    if (process.env.NODE_ENV !== 'production') {
      resp.errorMessage = exception.message;
    }

    response.status(statusCode).json(resp);
  }
}
