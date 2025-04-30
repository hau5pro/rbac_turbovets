import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums';

export const ROLES = 'roles';

export const RequiredRoles = (roles: UserRole[]) => {
  return SetMetadata(ROLES, roles);
};
