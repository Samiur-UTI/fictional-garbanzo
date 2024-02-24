import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
@Module({
  imports: [UserModule, AuthModule, CommonModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
