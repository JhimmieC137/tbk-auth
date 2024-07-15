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
import { TokenBlacklist } from '../auth/entities/blacklist.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User, Profile, Kyc, TokenBlacklist])],
  controllers: [UserController,],
  providers: [UserService, JwtStrategy, CustomInfoResDto, CustomListResDto, CustomResDto],
})
export class UserModule {}
