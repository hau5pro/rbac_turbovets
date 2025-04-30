import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums';

export const ROLES = 'roles';

export const Roles = (...roles: UserRole[]) => {
  return SetMetadata(ROLES, roles);
};
