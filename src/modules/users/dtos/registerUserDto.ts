import { ApiProperty } from '@nestjs/swagger';
// import { IsString } from 'class-validator';
import { USER_TYPE } from './enums';

export class registerUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: USER_TYPE;

  @ApiProperty()
  is_active: boolean;
}