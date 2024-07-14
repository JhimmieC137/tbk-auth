import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserController,
} from './user.controller';
import { UserService } from './user.service';
import { CustomInfoResDto, CustomListResDto, CustomResDto } from '../../helpers/schemas.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Kyc } from './entities/kyc.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Kyc])],
  controllers: [UserController,],
  providers: [UserService, CustomInfoResDto, CustomListResDto, CustomResDto],
})
export class UserModule {}
