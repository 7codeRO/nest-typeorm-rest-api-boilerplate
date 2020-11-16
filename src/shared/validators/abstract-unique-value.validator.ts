import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

interface UniqueValidationArguments<T> extends ValidationArguments {
  constraints: [
    ObjectType<T> | EntitySchema<T> | string,
    ((validationArguments: ValidationArguments) => FindConditions<T>) | keyof T,
  ];
}

export abstract class AbstractUniqueValueValidator implements ValidatorConstraintInterface {
  protected constructor(protected readonly connection: Connection) {}

  public async validate<T>(value: string, args: UniqueValidationArguments<T>): Promise<boolean> {
    const [EntityClass] = args.constraints;
    const fieldName = args.property;

    const entityOccurrence = await this.connection.getRepository(EntityClass).count({
      where: { [fieldName]: value },
    });

    return entityOccurrence <= 0;
  }

  public defaultMessage(args: ValidationArguments): string {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';

    return `${entity} with the same '${args.property}' already exist`;
  }
}
