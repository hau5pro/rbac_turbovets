import { Module } from '@nestjs/common';
import { PatientRecord } from 'src/db/entities/patient-record.entity';
import { PatientRecordController } from './patient-record.controller';
import { PatientRecordService } from './patient-record.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRecord])],
  providers: [PatientRecordService],
  controllers: [PatientRecordController],
})
export class PatientRecordModule {}
