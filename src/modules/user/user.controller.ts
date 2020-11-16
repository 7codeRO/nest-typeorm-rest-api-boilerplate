import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterUserDTO, UpdateUserDTO } from './user.dto';
import { ADMIN_ROLE, USER_ROLE } from '../auth/auth.constants';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FORBIDDEN_EXCEPTION_MESSAGE, UNAUTHORIZED_EXCEPTION_MESSAGE } from '../../shared/constants/strings';
import { HasRole } from '../role/role.decorator';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  /**
   *
   * @param {UserService} userService
   */
  constructor(private userService: UserService) {}

  @Get()
  @HasRole(ADMIN_ROLE, USER_ROLE)
  @ApiOperation({ description: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success', type: [User] })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION_MESSAGE })
  @ApiResponse({ status: 403, description: FORBIDDEN_EXCEPTION_MESSAGE })
  index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('')
  @HasRole(ADMIN_ROLE, USER_ROLE)
  @ApiOperation({ description: 'Add new user' })
  @ApiProduces('application/json')
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION_MESSAGE })
  @ApiResponse({ status: 403, description: FORBIDDEN_EXCEPTION_MESSAGE })
  async create(@Body() userData: RegisterUserDTO): Promise<any> {
    return this.userService.create(userData);
  }

  @Put(':id')
  @HasRole(ADMIN_ROLE, USER_ROLE)
  @ApiOperation({ description: 'Update user' })
  @ApiProduces('application/json')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ status: 200, description: 'Success', type: User })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION_MESSAGE })
  @ApiResponse({ status: 403, description: FORBIDDEN_EXCEPTION_MESSAGE })
  async update(@Param('id', ParseIntPipe) userId: number, @Body() userData: UpdateUserDTO): Promise<any> {
    return this.userService.update(userId, userData);
  }

  @Delete(':id')
  @HasRole(ADMIN_ROLE, USER_ROLE)
  @ApiOperation({ description: 'Delete user' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Success', type: DeleteResult })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION_MESSAGE })
  @ApiResponse({ status: 403, description: FORBIDDEN_EXCEPTION_MESSAGE })
  async delete(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return this.userService.delete(userId);
  }
}
