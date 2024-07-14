import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CustomErrResDto, CustomListResDto, CustomResDto } from 'src/helpers/schemas.dto';
import { JwtModule } from '@nestjs/jwt';
import { baseConfig } from 'src/settings/base.config';
import { UserModule } from '../users/user.module';
import { Profile } from '../users/entities/profile.entity';
import { Kyc } from '../users/entities/kyc.entity';
// import { DUPLICATE_USER_409 } from 'src/helpers/exceptions/auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Kyc]),
    JwtModule.register({
      global: true,
      secret: baseConfig().jwt_secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomListResDto, CustomResDto, CustomErrResDto],
})
export class AuthModule {}
