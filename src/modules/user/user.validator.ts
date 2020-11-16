import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from './user.entity';

// Check if user with email exist and return error
@ValidatorConstraint()
export class UserUniqueValidator implements ValidatorConstraintInterface {
  /**
   *
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  validate = async (email: string): Promise<boolean> => {
    const user = await getRepository(User).findOne({ where: { email } });
    return !user;
  };

  /**
   *
   * @param {ValidationArguments} validationArguments
   * @returns {string}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    const dataObject = validationArguments.object as any;
    return `User with email ${dataObject.email} already exist`;
  }
}

// Check if user with id exist and return success
@ValidatorConstraint()
export class UserExistValidator implements ValidatorConstraintInterface {
  /**
   *
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  validate = async (email: string): Promise<boolean> => {
    const user = await getRepository(User).findOne({ where: { email } });
    return !!user;
  };

  /**
   *
   * @param {ValidationArguments} validationArguments
   * @returns {string}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    const dataObject = validationArguments.object as any;
    return `User with email ${dataObject.email} does not exist`;
  }
}

@ValidatorConstraint()
export class UserExistById implements ValidatorConstraintInterface {
  /**
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  validate = async (id: string): Promise<boolean> => {
    const user = await getRepository(User).findOne({
      where: { id: Number(id) },
    });
    return !!user; // pass if true
  };

  /**
   *
   * @param {ValidationArguments} validationArguments
   * @returns {string}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `User with id ${validationArguments.value} does not exist.`;
  }
}

@ValidatorConstraint()
export class DuplicatedUserValidator implements ValidatorConstraintInterface {
  /**
   *
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  validate = async (email: string): Promise<boolean> => {
    const user = await getRepository(User).findOne({ where: { email } });
    return !user;
  };

  /**
   *
   * @param {ValidationArguments} validationArguments
   * @returns {string}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    const dataObject = validationArguments.object as any;
    return `User with this email ${dataObject.email} already exist.`;
  }
}
