import { Module } from '@nestjs/common';
import { PatientRecordController } from './patient-record.controller';
import { PatientRecordService } from './patient-record.service';

@Module({
  providers: [PatientRecordService],
  controllers: [PatientRecordController],
})
export class PatientRecordModule {}
