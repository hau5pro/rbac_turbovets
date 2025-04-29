import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PatientRecordModule } from './api/patient-record/patient-record.module';

@Module({
  imports: [PatientRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
