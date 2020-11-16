import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import moment from 'moment';

@ValidatorConstraint()
export class DateValidator implements ValidatorConstraintInterface {
  DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss.sss';

  /**
   *
   * @param {string} value
   * @returns {boolean}
   */
  validate = (value: string): boolean => {
    return moment(value, this.DATE_FORMAT).format(this.DATE_FORMAT) === value;
  };

  /**
   *
   * @param {ValidationArguments} validationArguments
   * @returns {string}
   */
  defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.property} should be in format ${this.DATE_FORMAT}.`;
  }
}
