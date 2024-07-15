import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Profile } from 'src/modules/users/entities/profile.entity';

export class CreateNotificationDto {
    @ApiProperty({
      required: true,
    })
    user_id: String;
    
    @ApiProperty({
      required: true,
    })
    profile: Profile;
    
    @ApiProperty({
      required: true,
    })
    message: String;
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}

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
  
  export class NotificationQueryDto extends paginationDto {
    @ApiProperty({
      required:  false,
    })
    search: string = null;
  }