import { Injectable, Scope } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER_APP_TAGS, SWAGGER_DESCRIPTION, SWAGGER_TITLE, SWAGGER_VERSION } from './swagger.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class SwaggerService {
  /** @var DocumentBuilder swaggerOptions */
  public swaggerOptions;

  /**
   *
   * Function generate swagger module
   */
  public prepareSwaggerOptions(): void {
    this.swaggerOptions = new DocumentBuilder()
      .setTitle(SWAGGER_TITLE)
      .setDescription(SWAGGER_DESCRIPTION)
      .setVersion(SWAGGER_VERSION)
      .addBearerAuth();

    this.setSwaggerTags();
    this.swaggerOptions.build();
  }

  /**
   *
   * Function set swagger document tags
   */
  public setSwaggerTags(): void {
    const options = this.swaggerOptions;
    SWAGGER_APP_TAGS.forEach(function (tag) {
      options.addTag(tag);
    });

    this.swaggerOptions = options;
  }
}
