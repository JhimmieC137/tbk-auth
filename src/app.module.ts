import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { baseConfig } from './settings/base.config';
import { dataSourceOptions } from './settings/dataSource.config';
import { dbConfig } from './settings/db.config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { appRoutes } from './helpers/router';
import { CallsModule } from './calls/calls.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RouterModule.register([
      ...appRoutes
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig, dbConfig],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CallsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
