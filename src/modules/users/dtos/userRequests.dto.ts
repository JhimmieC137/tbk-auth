import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNumber, IsOptional, IsBoolean } from 'class-validator';


export class paginationDto {
  @ApiPropertyOptional({
    default: 1
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;
  
  @ApiPropertyOptional({
    default: 10
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class usersQueryDto extends paginationDto {
  @ApiProperty({
    required:  false,
  })
  search: string = null;
}

export class kycDto {
  @ApiPropertyOptional()
  @IsString()
  user_id?: String;
  
  @ApiPropertyOptional()
  @IsBoolean()
  is_email_verified?: boolean;
  
  @ApiPropertyOptional()
  @IsBoolean()
  is_phone_verified?: boolean;
  
  @ApiPropertyOptional()
  @IsBoolean()
  is_ID_verified?: boolean;
}


export class ProfileDto {
  @ApiPropertyOptional()
  is_active?: boolean;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  profile_image?: string;

  @ApiPropertyOptional()
  phone?: string;
}

export class UserUpdateDto {
  @ApiPropertyOptional()
  first_name?: string;
  
  @ApiPropertyOptional()
  last_name?: string;
  
  
  @ApiPropertyOptional()
  username?: string;
  
  @ApiPropertyOptional()
  email?: string;
  
  
  @ApiPropertyOptional()
  kyc?: kycDto;
  
  @ApiPropertyOptional()
  profile?: ProfileDto
}