import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import {
  AuthResponse,
  ChangePasswordDTO,
  ForgotPasswordDecodedPayload,
  ForgotPasswordDTO,
  LoginUserDTO,
} from './auth.dto';
import { RegisterUserDTO } from '../user/user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param {LoginUserDTO} user
   * @returns {Promise<any | {status: number}>}
   */
  public async login(user: LoginUserDTO): Promise<AuthResponse> {
    const userData = await this.userRepository.findByEmail(user.email);

    if (!userData) {
      throw new UnauthorizedException();
    }

    const password = await crypto.createHmac('sha256', user.password).digest('hex');
    if (password !== userData.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 3600, //1h
    });

    return {
      ...payload,
      accessToken: accessToken,
    };
  }

  /**
   *
   * @param {RegisterUserDTO} user
   * @returns {Promise<User>}
   */
  public async register(user: RegisterUserDTO): Promise<User> {
    return this.userService.create(user);
  }

  public async reset(forgotPassword: ForgotPasswordDTO): Promise<any> {
    const user = await this.userRepository.findByEmail(forgotPassword.email);
    if (!user) {
      throw new BadRequestException('Invalid email.');
    }

    const token = this.jwtService.sign({
      email: forgotPassword.email,
    });

    const forgotPasswordRoute = '/forgot-password/confirm';
    const confirmPassChangeURL = `${process.env.FRONTEND_URL}/${forgotPasswordRoute}/${token}`;
    // TODO: send an email notification with this link

    return confirmPassChangeURL;
  }

  async changePassword(changePasswordDto: ChangePasswordDTO): Promise<boolean> {
    const decoded = this.jwtService.decode(changePasswordDto.token) as ForgotPasswordDecodedPayload;
    const email = decoded.email;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email.');
    }

    user.password = changePasswordDto.password;
    await this.userRepository.save(user);
    return true;
  }
}
