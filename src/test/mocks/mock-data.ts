import { Organization } from 'src/db/entities/organization.entity';
import { User } from 'src/db/entities/user.entity';
import { UserOrgRole } from 'src/db/entities/user-role.entity';
import { UserRole } from 'src/infrastructure/enums';

const MOCK_ORG: Organization = {
  id: 1,
  name: 'Veterans Health Org',
  parent: null,
  children: [],
};

const MOCK_USER: User = {
  id: 1,
  name: 'Test User 1',
  email: 'test@test.com',
  roles: [],
};

const MOCK_ROLE: UserOrgRole = {
  id: 99,
  user: MOCK_USER,
  organization: MOCK_ORG,
  role: UserRole.ADMIN,
};

MOCK_USER.roles = [MOCK_ROLE];

export const MOCK_ADMIN = MOCK_USER;
