import { AuthGuard, RolesGuard } from './infrastructure/guards';
import { Organization, PatientRecord, User, UserOrgRole } from './db/entities';

import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './api/auth/auth.module';
import { Module } from '@nestjs/common';
import { PatientRecordModule } from './api/patient-record/patient-record.module';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Organization, UserOrgRole, PatientRecord],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, UserOrgRole, Organization, PatientRecord]),
    ServicesModule,
    PatientRecordModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },

    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
    AuthGuard,
    RolesGuard,
  ],
})
export class AppModule {}
