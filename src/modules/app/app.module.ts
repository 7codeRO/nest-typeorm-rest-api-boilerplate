import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { SwaggerService } from '../../swagger/swagger.service';
import { EntityExistValidator } from '../../shared/validators/entity-exist.validator';
import { UniqueValueValidator } from '../../shared/validators/unique-value.validator';
import config from '../../database/config/local';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'coverage/lcov-report/'),
      renderPath: '/coverage',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    LoggerModule,
    AuthModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueValueValidator, EntityExistValidator, SwaggerService],
})
export class AppModule {}
