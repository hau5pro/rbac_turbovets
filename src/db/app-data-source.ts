import { DataSource } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { PatientRecord } from './entities/patient-record.entity';
import { User } from './entities/user.entity';
import { UserOrgRole } from './entities/user-role.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [User, Organization, UserOrgRole, PatientRecord],
  synchronize: true,
  logging: false,
});
