import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [AuthService],
})
export class AuthModule {}
