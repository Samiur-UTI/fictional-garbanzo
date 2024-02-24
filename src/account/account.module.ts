import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from 'src/model/entity/account.entity';
import { Platform } from '../model/entity/platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Platform])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
