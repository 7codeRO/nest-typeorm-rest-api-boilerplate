import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HasRole } from './role.decorator';
import { RoleSuccessResponseDTO } from './role.dto';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { DefaultResponseDTO } from '../../shared/dto/default-response.dto';
import { ROLES } from '../../shared/constants/constants';
import { SUCCESS } from '../../shared/constants/strings';

@ApiTags('role')
@ApiBearerAuth()
@Controller('users/roles')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get()
  @HasRole(ROLES.ADMIN)
  @ApiOperation({
    description: 'Get a list of roles that admin user can choose to set when creating new user for admin panel',
  })
  @ApiResponse({ status: 200, description: 'success', type: RoleSuccessResponseDTO })
  getRoles(): DefaultResponseDTO<string[]> {
    const roles = this.rolesService.getRoles();

    return {
      data: roles,
      message: SUCCESS,
    };
  }
}
