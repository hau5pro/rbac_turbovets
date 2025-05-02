import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
