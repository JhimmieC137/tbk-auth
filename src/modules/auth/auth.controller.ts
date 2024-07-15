import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ConfirmEmailDto,
  OauthLoginDto,
  PasswordResetDto,
  RegisterDto,
  SignInDto,
  SignOutDto,
  VerifyEmailDto,
} from '../auth/dtos/authRequests.dto';
import { CustomErrResDto, CustomInfoResDto, CustomListResDto, CustomResDto } from 'src/helpers/schemas.dto';
import { response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private customInfoResDto: CustomInfoResDto,
    private customRes: CustomResDto,
    private customErr: CustomErrResDto,
  ) {}


  
  @Get('/Oauth')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('/Oauth/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: OauthLoginDto) {
    return this.authService.googleLogin(req)
  }


  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() registerUserDto: RegisterDto): Promise<CustomResDto | CustomErrResDto> {
    const newUser = await this.authService.registerUser(registerUserDto);
    const response = this.customRes;
    response.results = { ...newUser };
    response.message = `User created succesfully`;
    return response;
  }
  
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() loginInUserDto: SignInDto): Promise<CustomResDto | CustomErrResDto> {
    const user = await this.authService.signIn(loginInUserDto);
    const response = this.customRes;
    response.results = { ...user };
    response.message = 'User logged in successfully'
    return response
  }
  
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post('/sign-out')
  @HttpCode(HttpStatus.OK)
  async logOut(@Body() signOutDto: SignOutDto): Promise<CustomInfoResDto | CustomErrResDto> {
    await this.authService.signOut(signOutDto.token)
    const response = this.customInfoResDto;
    response.message = 'User logged out successfully'
    return response
  }

  @Post('/request-password-reset')
  @HttpCode(HttpStatus.OK)
  async passwordReset(@Body() passwordResetDto: PasswordResetDto): Promise<CustomResDto | CustomErrResDto> {
    const response = this.customRes;
    response.results = await this.authService.requestPasswordReset(passwordResetDto)
    response.message = 'Password reset email sent';
    return response
  }

  @Post('/change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const response = this.customRes;
    response.results = await this.authService.passwordReset(changePasswordDto);
    response.message = 'Password reset successful';
    return response;
  }

  @Post('/verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const response = this.customRes;
    response.results = await this.authService.verifyUsermail(verifyEmailDto);
    response.message = 'Email verification successful';
    return response;
  }
  
  @Post('/confirm-email')
  async confirmEmail(@Body() confirmEmailDta: ConfirmEmailDto) {
    const response = this.customRes;
    response.results = await this.authService.confirmUserEmail(confirmEmailDta);
    response.message = 'Email verification successful';
    return response;
  }
}
