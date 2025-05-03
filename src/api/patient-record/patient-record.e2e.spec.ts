import * as request from 'supertest';

import { CreateRecordRequest, GetRecordsRequest } from './requests';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from 'src/app.module';
import { AuthGuard } from 'src/infrastructure/guards';
import { DataSource } from 'typeorm';
import { MockAuthGuard } from 'src/test/mocks/mock-auth.guard';
import { PatientRecord } from 'src/db/entities/patient-record.entity';
import { PatientRecordRoutes } from './routes';
import { PatientRecordTestData } from './patient-record.e2e.data';
import { SpecHelper } from 'src/test/spec-helper';
import { User } from 'src/db/entities';
import { addTestData } from 'src/test/test-data';

describe('Patient Records E2E', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  SpecHelper.initLifecycleHooks();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>(
      new ExpressAdapter(),
    );

    await app.init();

    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
    await addTestData(dataSource, PatientRecordTestData.default);
  });

  afterEach(() => {
    MockAuthGuard.setMockUser(null);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /records/create', () => {
    it('should create a new patient record successfully', async () => {
      setMockUser(PatientRecordTestData.alice);
      const request: CreateRecordRequest = {
        name: 'John Doe',
        diagnosis: 'Flu',
        orgId: 1001,
      };

      const response = await makeRequest(app)
        .post(PatientRecordRoutes.getFullRoute(PatientRecordRoutes.create))
        .send(request)
        .expect(HttpStatus.CREATED);
      const body = response.body as PatientRecord;

      expect(body).toHaveProperty('id');
      expect(body.name).toBe(request.name);
      expect(body.diagnosis).toBe(request.diagnosis);
      expect(body.organization.id).toBe(request.orgId);
    });
  });

  describe('POST /records/get', () => {
    it('should not allow a user to get records that arent part of their organization', async () => {
      setMockUser(PatientRecordTestData.bob);
      const request: GetRecordsRequest = {
        orgId: 1001,
      };

      await makeRequest(app)
        .post(PatientRecordRoutes.getFullRoute(PatientRecordRoutes.get))
        .send(request)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should allow a user in a parent organization to get records from a child organization', async () => {
      setMockUser(PatientRecordTestData.alice);
      const request: GetRecordsRequest = {
        orgId: 1002,
      };

      const response = await makeRequest(app)
        .post(PatientRecordRoutes.getFullRoute(PatientRecordRoutes.get))
        .send(request)
        .expect(HttpStatus.CREATED);
      const body = response.body as PatientRecord[];

      const expected = PatientRecordTestData.default.patientRecords![1];

      expect(body[0].id).toBe(expected.id);
    });
  });
});

function makeRequest(app: INestApplication) {
  return request(app.getHttpServer());
}

function setMockUser(user?: Partial<User | undefined>) {
  MockAuthGuard.setMockUser({ id: user!.id!, email: user!.email! });
}
