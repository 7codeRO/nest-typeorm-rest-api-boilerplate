import { Request } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { INVALID_EMAIL } from '../../shared/constants/strings';
import { UserDTO } from '../user/user.dto';

export class AuthResponse extends UserDTO {
  accessToken: string;
}

export interface JwtRequest extends Request {
  user: JwtUser;
}

export interface JwtUser {
  id: number;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface ForgotPasswordDecodedPayload {
  email: string;
}

export class ForgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Incorrect E-mail' })
  email: string;
}

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, {
    message: 'Weak password',
  })
  readonly password: string;

  @IsString()
  readonly token: string;
}
