import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../user/user.entity';
import { JWT_SECRET } from '../../shared/constants/constants';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: process.env.NODE_ENV === 'dev',
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: User): Promise<User> {
    const email = payload.email;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
