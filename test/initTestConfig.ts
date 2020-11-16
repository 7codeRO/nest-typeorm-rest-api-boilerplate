import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule, INestApplication } from '@nestjs/common';
import { AttachmentModule } from '../src/modules/attachment/attachment.module';

const initTestConfig = async (module: DynamicModule): Promise<any> => {
  let app: INestApplication = null;
  //eslint-disable-next-line
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: false,
        entities: [process.cwd() + '/**/**.entity{.ts,.js}'],
      }),
      AttachmentModule,
      module,
    ],
  }).compile();

  app = await moduleFixture.createNestApplication().init();

  return {
    app,
    moduleFixture,
  };
};

export default initTestConfig;
