import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { Transport } from '@nestjs/microservices';
import { baseConfig } from './settings/base.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const apiDocsConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Travel Booking Platform - Auth and User Management')
  .setDescription('All endpoints for the platforms auth operations and user managemeent')
  .setVersion('1.0')
  .addTag('Auth')
  .build();

  const apiDocs = SwaggerModule.createDocument(app, apiDocsConfig, {
    include: [AuthModule, UserModule, NotificationsModule],
  });

  SwaggerModule.setup('docs', app, apiDocs);

  app.useGlobalPipes(new ValidationPipe());
  const port = app.get(ConfigService).get<number>('PORT', 3100);
  await app.listen(port);
}
bootstrap();
