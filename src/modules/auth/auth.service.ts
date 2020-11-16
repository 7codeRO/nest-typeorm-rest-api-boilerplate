import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { AuthResponse, LoginUserDTO } from './auth.dto';
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
}
