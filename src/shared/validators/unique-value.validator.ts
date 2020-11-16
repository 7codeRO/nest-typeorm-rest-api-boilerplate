import { ValidatorConstraint } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AbstractUniqueValueValidator } from './abstract-unique-value.validator';

@ValidatorConstraint({ name: 'unique', async: false })
@Injectable()
export class UniqueValueValidator extends AbstractUniqueValueValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}
