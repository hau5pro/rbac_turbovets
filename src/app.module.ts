import { AuthGuard, RolesGuard } from './infrastructure/guards';

import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { Module } from '@nestjs/common';
import { PatientRecordModule } from './api/patient-record/patient-record.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ServicesModule, PatientRecordModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
  ],
})
export class AppModule {}
