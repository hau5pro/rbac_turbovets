import { TestData } from 'src/test/test-data';
import { User } from 'src/db/entities';
import { UserRole } from 'src/infrastructure/enums';

export class PatientRecordTestData {
  static alice: Partial<User> = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  };
  static bob: Partial<User> = { id: 2, name: 'Bob', email: 'bob@example.com' };

  static default: TestData = {
    users: [this.alice, this.bob],
    organizations: [
      { id: 1001, name: 'HQ' },
      { id: 1002, name: 'Panama', parentOrgId: 1001 },
    ],
    userOrgRoles: [
      { id: 101, userId: 1, orgId: 1001, role: UserRole.ADMIN },
      { id: 102, userId: 2, orgId: 1002, role: UserRole.VIEWER },
    ],
    patientRecords: [
      { id: 10001, name: 'Patient1', diagnosis: 'Cold', orgId: 1001 },
      { id: 10002, name: 'Patient2', diagnosis: 'Flu', orgId: 1002 },
    ],
  };
}
