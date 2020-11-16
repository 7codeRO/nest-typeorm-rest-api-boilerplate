import { Request } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
