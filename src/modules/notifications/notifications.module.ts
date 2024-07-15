import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { PassportModule } from '@nestjs/passport';
import { CustomInfoResDto, CustomListResDto, CustomResDto } from 'src/helpers/schemas.dto';
import { JwtStrategy } from '../auth/jwt.strategy';


@Module({
  imports: [
    PassportModule, 
    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, JwtStrategy, CustomInfoResDto, CustomListResDto, CustomResDto],
})
export class NotificationsModule {}