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
import { CreateUserDTO, RegisterUserDTO, UpdateUserDTO } from './user.dto';
import { ADMIN_ROLE, USER_ROLE } from '../auth/auth.constants';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FORBIDDEN_EXCEPTION_MESSAGE, SUCCESS, UNAUTHORIZED_EXCEPTION_MESSAGE } from '../../shared/constants/strings';
import { HasRole } from '../role/role.decorator';
import { DefaultResponseDTO } from '../../shared/dto/default-response.dto';
import { ROLES } from '../../shared/constants/constants';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
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

  @Get(':id')
  @HasRole(ROLES.ADMIN, USER_ROLE)
  @ApiOperation({ description: 'Get a user details' })
  @ApiResponse({ status: 200, description: 'Success', type: DefaultResponseDTO })
  @ApiResponse({ status: 400, description: 'Bad Request - The provided user id is missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have rights to access the resource' })
  @ApiResponse({ status: 404, description: 'Not Found - Can not find a user by provided id' })
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<DefaultResponseDTO<User>> {
    const user = await this.userService.findUser(id);
    return { message: SUCCESS, data: user };
  }

  @Post('')
  @HasRole(ADMIN_ROLE, USER_ROLE)
  @ApiOperation({ description: 'Add new user' })
  @ApiProduces('application/json')
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION_MESSAGE })
  @ApiResponse({ status: 403, description: FORBIDDEN_EXCEPTION_MESSAGE })
  async create(@Body() userData: RegisterUserDTO): Promise<User> {
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
  async update(@Param('id', ParseIntPipe) userId: number, @Body() userData: UpdateUserDTO): Promise<User> {
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
    await this.userService.delete(userId);
    return { message: SUCCESS };
  }
}
