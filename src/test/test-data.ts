import {
  Organization,
  PatientRecord,
  User,
  UserOrgRole,
} from 'src/db/entities';

import { DataSource } from 'typeorm';

export interface TestData {
  users?: Partial<User & { id: number }>[];
  organizations?: Partial<Organization & { id: number }>[];
  userOrgRoles?: Partial<UserOrgRole & { id: number }>[];
  patientRecords?: Partial<PatientRecord & { id: number }>[];
}

export async function addTestData(dataSource: DataSource, data: TestData) {
  const userMap = new Map<number, User>();
  const orgMap = new Map<number, Organization>();

  if (data.users) {
    for (const userData of data.users) {
      const user = await dataSource.getRepository(User).save(userData);
      userMap.set(user.id, user);
    }
  }

  if (data.organizations) {
    for (const orgData of data.organizations) {
      const org = await dataSource.getRepository(Organization).save(orgData);
      orgMap.set(org.id, org);
    }
  }

  if (data.userOrgRoles) {
    for (const roleData of data.userOrgRoles) {
      // TODO handle map retrieval better
      const user = userMap.get(roleData.userId!);
      const org = orgMap.get(roleData.orgId!);
      if (user && org) {
        await dataSource.getRepository(UserOrgRole).save({
          ...roleData,
          user,
          organization: org,
        });
      }
    }
  }

  if (data.patientRecords) {
    for (const recordData of data.patientRecords) {
      // TODO handle map retrieval better
      const org = orgMap.get(recordData.orgId!);
      if (org) {
        await dataSource.getRepository(PatientRecord).save({
          ...recordData,
          organization: org,
        });
      }
    }
  }
}
