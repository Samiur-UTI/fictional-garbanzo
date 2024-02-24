/* eslint-disable prettier/prettier */
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { User } from 'src/model/entity/user.entity';
import { Profile } from 'src/model/entity/profile.entity';
import { Platform } from 'src/model/entity/platform.entity';
import { Account } from 'src/model/entity/account.entity';
import { ScheduleService } from 'src/model/entity/schedule-service.entity';
import { Post } from 'src/model/entity/post.entity';
import { AccountCredentials } from 'src/model/entity/account-credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig: TypeOrmModuleOptions = {
          type: 'mysql', 
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [User,Profile,Platform,Account,ScheduleService,Post,AccountCredentials],
          synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
        };
        return dbConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
