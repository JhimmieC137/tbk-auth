import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CustomErrResDto, CustomInfoResDto, CustomListResDto, CustomResDto } from 'src/helpers/schemas.dto';
import { JwtModule } from '@nestjs/jwt';
import { baseConfig } from 'src/settings/base.config';
import { UserModule } from '../users/user.module';
import { Profile } from '../users/entities/profile.entity';
import { Kyc } from '../users/entities/kyc.entity';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenBlacklist } from './entities/blacklist.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GoogleStrategy } from './google.strategy';
// import { DUPLICATE_USER_409 } from 'src/helpers/exceptions/auth';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        name: 'HOTEL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [baseConfig().rabbit_url],
          queue: 'hotel_queue',
        }
      },
      {
        name: 'FLIGHT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [baseConfig().rabbit_url],
          queue: 'flight_queue',
        }
      },
    ]),
    TypeOrmModule.forFeature([User, Profile, Kyc, TokenBlacklist]),
    JwtModule.register({
      global: true,
      secret: baseConfig().jwt_secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, CustomInfoResDto, CustomListResDto, CustomResDto, CustomErrResDto],
})
export class AuthModule {}
