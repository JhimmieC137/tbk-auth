import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Valid email address required!',
    },
  )
  email: string;
}

export class SignInDto extends PasswordResetDto {
  @ApiProperty()
  @IsString()
  password: string;
}

export class RegisterDto extends SignInDto {
  @ApiProperty()
  @IsString()
  first_name: string = null;

  @ApiProperty()
  @IsString()
  last_name: string = null;

  @ApiProperty()
  username: string = null;

  @ApiProperty()
  email: string = null;
}

export class ChangePasswordDto extends SignInDto {
  @ApiProperty()
  token: string = null;
}

export class ConfirmEmailDto {
  @ApiProperty()
  id: string = null;
}

export class VerifyEmailDto {
  @ApiProperty()
  token: string = null;
}

export class OauthUserDto {
  @ApiProperty()
  token: string;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  firstName: string
  
  @ApiProperty()
  lastName: string;
  
  @ApiProperty()
  picture: string;
  
  @ApiProperty()
  accessToken: string;
}

export class OauthLoginDto {
  @ApiProperty()
  user: OauthUserDto;
}


export class SignOutDto extends VerifyEmailDto{}