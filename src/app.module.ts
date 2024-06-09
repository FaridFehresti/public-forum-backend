import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TaksModule } from './tasks/tasks.module';

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    AuthModule,
    TaksModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
