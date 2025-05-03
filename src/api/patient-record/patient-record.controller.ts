import { Body, Controller, Post, Req } from '@nestjs/common';
import { Permission, UserRole } from 'src/infrastructure/enums';
import { Permissions, Roles } from 'src/infrastructure/decorators';

import { PatientRecordRoutes } from './routes';
import { PatientRecordService } from './patient-record.service';
import {
  CreateRecordRequest,
  GetRecordsRequest,
  UpdateRecordRequest,
} from './requests';
import { RequestWithUser } from 'src/infrastructure/interfaces/request-with-user';
import { WithIdRequest } from 'src/infrastructure/requests';

@Controller(PatientRecordRoutes.rootRoute)
export class PatientRecordController {
  constructor(private readonly patientService: PatientRecordService) {}

  @Post(PatientRecordRoutes.create)
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @Permissions(Permission.WRITE)
  async createRecord(
    @Body() request: CreateRecordRequest,
    @Req() req: RequestWithUser,
  ) {
    return this.patientService.createRecord(request, req.user);
  }

  @Post(PatientRecordRoutes.update)
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @Permissions(Permission.WRITE)
  async updateRecord(@Body() request: UpdateRecordRequest) {
    return this.patientService.updateRecord(request);
  }

  @Post(PatientRecordRoutes.get)
  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.VIEWER)
  @Permissions(Permission.READ)
  async getRecords(@Body() request: GetRecordsRequest) {
    return this.patientService.getRecords(request);
  }

  @Post(PatientRecordRoutes.delete)
  @Roles(UserRole.ADMIN)
  @Permissions(Permission.WRITE)
  async deleteRecord(@Body() request: WithIdRequest) {
    return this.patientService.deleteRecord(request);
  }
}
