import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cors from 'cors';

import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { QueryFailedExceptionFilter } from './filters/query-failed-exception.filter';
import { CustomValidationException } from './exceptions/validation.exception';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { AppModule } from './modules/app/app.module';
import { API_PREFIX } from './shared/constants/constants';
import { mapErrorMessagesFromValidator } from './shared/helpers';
import { TrimBodyPipe } from './shared/dto/dto-property.transformer';
import { SWAGGER_API_PATH } from './swagger/swagger.constants';
import { SwaggerService } from './swagger/swagger.service';
import { MyLogger } from './modules/logger/logger.service';

//eslint-disable-next-line
require('dotenv').config();

const PORT = process.env.PORT;

const initApp = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn'],
    // logger: false,
    bodyParser: true,
  });
  // app.useLogger(new MyLogger());

  // TODO: fix 413 - File Too Large
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(cors());

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
    new QueryFailedExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  // TrimPipe should be before ValidationPipe, to provide trimmed values
  app.useGlobalPipes(
    new TrimBodyPipe(),
    new ValidationPipe({
      whitelist: true,
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) => {
        return new CustomValidationException(errors.reduce(mapErrorMessagesFromValidator, {}));
      },
    }),
  );

  const swagger = await app.resolve(SwaggerService);
  swagger.prepareSwaggerOptions();
  const document = SwaggerModule.createDocument(app, swagger.swaggerOptions.build());
  SwaggerModule.setup(SWAGGER_API_PATH, app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.listen(PORT, async () => {
    const logger = await app.resolve(MyLogger);
    logger.setContext('Main');
    logger.log(`Server started listening on PORT: ${PORT}`);
  });
};

initApp();
