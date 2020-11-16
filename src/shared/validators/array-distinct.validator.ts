import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { splitCamelCase } from '../helpers';

interface ArrayDistinctValidatorArguments extends ValidationArguments {
  constraints: [string];
}

@ValidatorConstraint()
export class ArrayDistinctValidator implements ValidatorConstraintInterface {
  validate = <T>(value: T[], args: ArrayDistinctValidatorArguments): boolean => {
    let hasDuplicates = false;

    if (value && value.length > 1) {
      const uniqueValues = new Set();
      const [propertyKey] = args.constraints;

      hasDuplicates = !!value.filter((current: T) => {
        const currentValue = current[propertyKey];

        return currentValue && uniqueValues.size === uniqueValues.add(currentValue).size;
      }).length;
    }

    return !hasDuplicates;
  };

  /**
   *
   * @param {ValidationArguments} validationArguments
   * @returns {string}
   */
  defaultMessage(validationArguments: ValidationArguments): string {
    const entryName =
      validationArguments.constraints && validationArguments.constraints.length > 0
        ? validationArguments.constraints[0]
        : 'entries';

    return `You have duplicate ${entryName} for the ${splitCamelCase(validationArguments.property, true)}!`;
  }
}
