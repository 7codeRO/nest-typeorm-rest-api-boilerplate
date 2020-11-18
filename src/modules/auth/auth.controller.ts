import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, ChangePasswordDTO, ForgotPasswordDTO, LoginUserDTO } from './auth.dto';
import { RegisterUserDTO } from '../user/user.dto';
import { ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { BasicResponseDTO, DefaultResponseDTO } from '../../shared/dto/default-response.dto';
import { SUCCESS } from '../../shared/constants/strings';

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
  async login(@Body() user: LoginUserDTO): Promise<AuthResponse> {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ description: 'Register user' })
  @ApiProduces('application/json')
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  async register(@Body() user: RegisterUserDTO): Promise<User> {
    return this.authService.register(user);
  }

  @Post('forgot-password')
  @ApiOperation({ description: 'Forgot password.' })
  @ApiProduces('application/json')
  @ApiBody({ type: ForgotPasswordDTO })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDTO): Promise<BasicResponseDTO> {
    await this.authService.reset(forgotPassword);
    return {
      message: SUCCESS,
    };
  }

  @Post('forgot-password/change')
  @ApiOperation({ description: 'Confirm password.' })
  @ApiProduces('application/json')
  @ApiBody({ type: ChangePasswordDTO })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  async changePassword(@Body() changePasswordDto: ChangePasswordDTO): Promise<BasicResponseDTO> {
    await this.authService.changePassword(changePasswordDto);
    return {
      message: SUCCESS,
    };
  }
}
