import {
  CreateRecordRequest,
  GetRecordsRequest,
  UpdateRecordRequest,
} from './requests';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRecord } from 'src/db/entities/patient-record.entity';
import { AuthData } from 'src/infrastructure/interfaces';
import { WithIdRequest } from 'src/infrastructure/requests';
import { Repository } from 'typeorm';

@Injectable()
export class PatientRecordService {
  static errorMessages: {
    recordNotFound: 'Record not found.';
  };

  constructor(
    @InjectRepository(PatientRecord)
    private readonly patientRecordRepo: Repository<PatientRecord>,
  ) {}

  async createRecord(
    request: CreateRecordRequest,
    authData: AuthData,
  ): Promise<PatientRecord> {
    const newRecord = this.patientRecordRepo.create({
      name: request.name,
      diagnosis: request.diagnosis,
      organization: { id: request.orgId },
      createdBy: authData.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.patientRecordRepo.save(newRecord);
  }

  async getRecords(request: GetRecordsRequest): Promise<PatientRecord[]> {
    const records = await this.patientRecordRepo.find({
      where: { orgId: request.orgId },
      take: request.limit ?? 10,
    });

    return records;
  }

  async updateRecord(request: UpdateRecordRequest) {
    const record = await this.patientRecordRepo.findOne({
      where: { id: request.id },
    });

    if (!record) {
      throw new Error(PatientRecordService.errorMessages.recordNotFound);
    }

    record.name = request.name ?? record.name;
    record.diagnosis = request.diagnosis ?? record.diagnosis;
    record.orgId = request.orgId ?? record.orgId;
    record.updatedAt = new Date();
  }

  async deleteRecord(request: WithIdRequest): Promise<void> {
    const record = await this.patientRecordRepo.findOne({
      where: { id: request.id },
    });

    if (!record) {
      throw new Error(PatientRecordService.errorMessages.recordNotFound);
    }

    await this.patientRecordRepo.remove(record);
  }
}
