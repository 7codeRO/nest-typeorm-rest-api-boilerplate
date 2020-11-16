import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './auth.dto';
import { RegisterUserDTO } from '../user/user.dto';
import { ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  /**
   *
   * @param {AuthService} authService
   */
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiProduces('application/json')
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ status: 201, description: 'Success' })
  async login(@Body() user: LoginUserDTO): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ description: 'Register user' })
  @ApiProduces('application/json')
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  async register(@Body() user: RegisterUserDTO): Promise<any> {
    return this.authService.register(user);
  }
}
