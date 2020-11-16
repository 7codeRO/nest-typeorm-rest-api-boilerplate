import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
