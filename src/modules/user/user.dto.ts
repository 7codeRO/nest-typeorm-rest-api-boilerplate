import { User } from './user.entity';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { INVALID_EMAIL, INVALID_ROLE, USED_EMAIL } from '../../shared/constants/strings';
import { UniqueValueValidator } from '../../shared/validators/unique-value.validator';
import { ROLES } from '../../shared/constants/constants';
import { MAX_USER_NAME_CHARS, MIN_USER_NAME_CHARS } from './user.constants';
import { DuplicatedUserValidator, UserUniqueValidator } from './user.validator';

export class CreateUserDTO {
  @IsEmail({}, { message: INVALID_EMAIL })
  @Validate(UniqueValueValidator, [User], { message: USED_EMAIL })
  readonly email: string;

  @IsEnum(ROLES, { message: INVALID_ROLE })
  readonly role: string;

  @IsOptional()
  @Length(MIN_USER_NAME_CHARS, MAX_USER_NAME_CHARS)
  name?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEmail({}, { message: INVALID_EMAIL })
  @Validate(DuplicatedUserValidator)
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Validate(UserUniqueValidator)
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}

export class UserDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Incorrect E-mail' })
  email: string;
}
