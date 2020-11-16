import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { MyLogger } from '../modules/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: MyLogger) {
    this.logger.setContext('LoggerMiddleware');
  }

  use(req: Request, res: Response, next: CallableFunction): void {
    // TODO: use this.logger.log
    console.log(`[API Request] ${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`);
    next();
  }
}
