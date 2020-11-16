import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

interface EntityExistValidationArguments<T> extends ValidationArguments {
  constraints: [
    ObjectType<T> | EntitySchema<T> | string,
    ((validationArguments: ValidationArguments) => FindConditions<T>) | keyof T,
  ];
}

@ValidatorConstraint({ name: 'entityExist', async: false })
@Injectable()
export class EntityExistValidator implements ValidatorConstraintInterface {
  constructor(@InjectConnection() protected readonly connection: Connection) {}

  public async validate<T>(value: string, args: EntityExistValidationArguments<T>): Promise<boolean> {
    if (!value) {
      return false;
    }

    const [EntityClass, fieldName] = args.constraints;
    const entityOccurrence = await this.connection.getRepository(EntityClass).count({
      where: { [`${fieldName}`]: value },
    });

    return !!entityOccurrence;
  }
}
