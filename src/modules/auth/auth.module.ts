import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import { JwtStrategy } from './auth.jwt.strategy';
import { JWT_SECRET } from '../../shared/constants/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
