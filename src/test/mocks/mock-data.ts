import { Organization } from 'src/db/entities/organization.entity';
import { User } from 'src/db/entities/user.entity';
import { UserOrgRole } from 'src/db/entities/user-role.entity';
import { UserRole } from 'src/infrastructure/enums';

export function createMockOrganization(
  overrides: Partial<Organization> = {},
): Organization {
  return {
    id: 1,
    name: 'Veterans Health Org',
    parentOrgId: null,
    children: [],
    createdBy: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as Organization;
}

export function createMockUser(overrides: Partial<User> = {}): User {
  const user: User = {
    id: 1,
    name: 'Test User 1',
    email: 'test@test.com',
    roles: [],
    ...overrides,
  } as User;

  return user;
}

export function createMockUserOrgRole(
  user: User,
  org: Organization,
  role: UserRole,
  overrides: Partial<UserOrgRole> = {},
): UserOrgRole {
  const userOrgRole: UserOrgRole = {
    id: 99,
    user,
    userId: user.id,
    organization: org,
    orgId: org.id,
    role,
    ...overrides,
  } as UserOrgRole;

  user.roles = [userOrgRole];
  return userOrgRole;
}

const MOCK_ORG = createMockOrganization();
const MOCK_ADMIN = createMockUser();
createMockUserOrgRole(MOCK_ADMIN, MOCK_ORG, UserRole.ADMIN);

export { MOCK_ORG, MOCK_ADMIN };
