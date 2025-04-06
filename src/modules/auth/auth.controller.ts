import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request, Req, Head } from '@nestjs/common';
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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import fs from "fs";
import path from "path";
import OpenAI from "openai";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private customInfoResDto: CustomInfoResDto,
    private customRes: CustomResDto,
    private customErr: CustomErrResDto,
  ) {}


  @Head("health")
  async getHealth(): Promise<Boolean>{
    return true;
  }

  
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

  @Post('/testcalls')
  async testcalls(@Body() req: any) {

    // const response = this.customRes
    // const openai = new OpenAI();
    // const speechFile = path.resolve("./speech.mp3");

    // const mp3 = await openai.audio.speech.create({
    //   model: "gpt-4o-mini-tts",
    //   voice: "coral",
    //   input: "Today is a wonderful day to build something people love!",
    //   instructions: "Speak in a cheerful and positive tone.",
    // });

    // const buffer = Buffer.from(await mp3.arrayBuffer());
    // await fs.promises.writeFile(speechFile, buffer);
    // response.results = {
    //   id: 1
    // };
    console.log(req)
    // response.message = 'Request successful'
    // return response
  }
}
